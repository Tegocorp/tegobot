const { getArgs } = require('../utils/index');
const { prefix: basePrefix } = require('../config');

module.exports = {
  name: 'message',
  async execute(client, msg) {
    const commands = client.commands;
    const { music, channels } = msg.guild;

    if (!music.serverData) await music.checkServerData();

    // Datos del servidor
    const musicData = music.serverData;

    // Comprueba si el comando debe ejecutarse
    if (!msg.content.startsWith(basePrefix) || msg.author.bot) {
      // Comprueba si el mensaje ha sido enviado en el canal de gestión
      if (msg.channel.id === musicData.player.textChannel) {
        await music.fetchPlayerMessage();
        const playerCommand = commands.get('play');

        playerCommand.isManagementChannel = true;

        // Realiza la ejecución del comando play
        const query = getArgs(msg.content, basePrefix);
        return playerCommand.execute(msg, query);
      } else return;
    }

    // Obtiene los argumentos
    const args = getArgs(msg.content, basePrefix);
    // Obtiene el nombre del comando
    const commandName = args.shift().toLocaleLowerCase();
    // Obtiene el comando introducido por el usuario
    const command =
      commands.get(commandName) ||
      commands.find((cmd) => cmd.aliases && cmd.aliases.includes(commandName));

    if (!command) return;

    if (command.music) {
      // Obtiene el canal de gestión
      const managementChannel = channels.cache.get(
        musicData.player.textChannel
      );

      if (!managementChannel && command.name !== 'setup') {
        return msg.reply(
          'No se ha encontrado el canal de gestión.\n' +
            'Para reproducir música debes configurar el servidor con `!setup`'
        );
      } else {
        if (managementChannel) await music.fetchPlayerMessage();

        if (msg.channel.id === musicData.player.textChannel)
          command.isManagementChannel = true;
        else command.isManagementChannel = false;
      }
    }

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
