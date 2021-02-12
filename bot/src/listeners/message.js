const { Collection } = require('discord.js');

const { prefix: basePrefix } = require('../config');

module.exports = {
  name: 'message',
  execute(client, msg) {
    const commands = client.commands;
    const cooldowns = client.cooldowns;

    // Comprueba si es un mensaje válido para ser ejecutado
    if (!msg.content.startsWith(basePrefix) || msg.author.bot) return;

    // Obtiene el nombre del comando y los argumentos
    const args = msg.content.slice(basePrefix.length).trim().split(/ +/);
    const commandName = args.shift().toLocaleLowerCase();

    const command =
      commands.get(commandName) ||
      commands.find((cmd) => cmd.aliases && cmd.aliases.includes(commandName));

    if (!command) return;

    // Comprueba si el comando solo puede ejecutarse en servidores
    if (command.guildOnly && msg.channel.type === 'dm')
      return msg.reply(
        'No puedo ejecutar este comando dentro de mensajes privados.'
      );

    // Comprueba si se le han otorgado los permisos necesarios al usuario
    if (command.permissions) {
      const authorPerms = msg.channel.permissionsFor(msg.author);
      if (!authorPerms || !authorPerms.has(command.permissions)) {
        return msg.reply(
          `No tienes los permisos necesarios para ejecutar este comando ${msg.author}`
        );
      }
    }

    // Comprueba si no se han especificado argumentos en el mensaje
    if (command.args && !args.length) {
      let reply = `No has especificado ningún argumento ${msg.author}`;

      if (command.usage) {
        reply += `\nEl uso adecuado sería: ${basePrefix}${commandName} ${command.usage}`;
      }

      return msg.channel.send(reply);
    }

    // Realiza las comprobaciones de cooldown pertinentes
    if (!cooldowns.has(command.name)) {
      cooldowns.set(command.name, new Collection());
    }

    const now = Date.now();
    const timestamps = cooldowns.get(command.name);
    const cooldownAmount = (command.cooldown || 3) * 1000;

    if (timestamps.has(msg.author.id)) {
      const expirationTime = timestamps.get(msg.author.id) + cooldownAmount;

      if (now < expirationTime) {
        const timeLeft = (expirationTime - now) / 1000;
        return msg.reply(
          `Por favor espera ${timeLeft.toFixed(
            1
          )} segundo(s) antes de reusar el comando (${command.name}).`
        );
      }
    }

    timestamps.set(msg.author.id, now);
    setTimeout(() => timestamps.delete(msg.author.id), cooldownAmount);

    // Realiza la ejecución del comando
    try {
      command.execute(msg, args);
    } catch (error) {
      console.error(
        `Ha ocurrido un error al tratar de ejecutar el comando (${command.name}): ${error.message}`
      );
    }
  },
};
