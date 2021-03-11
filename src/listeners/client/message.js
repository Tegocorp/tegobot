const { bot: config } = require('../../config');
const { getArgs } = require('../../utils/index');

module.exports = {
  name: 'message',
  async execute(client, msg) {
    const basePrefix = config.prefix;

    const commands = client.commands;
    const { music, channels } = msg.guild;

    await music.checkServerData();

    // Datos del servidor
    const musicData = music.serverData;

    // Comprueba si el comando debe ejecutarse
    if (!msg.content.startsWith(basePrefix) || msg.author.bot) {
      // Comprueba si el mensaje ha sido enviado en el canal de gestión
      if (!msg.author.bot && msg.channel.id === musicData.player.textChannel) {
        await music.fetchPlayerMessage();
        const playerCommand = commands.get('play');

        playerCommand.isManagementChannel = true;

        // Realiza la ejecución del comando play
        const query = getArgs(msg.content, basePrefix, true);
        return playerCommand
          .execute(msg, query)
          .catch((error) => console.error(error));
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
        `Ha ocurrido un error tratando de ejecutar el comando (${command.name}): ${error.message}`
      );
    }
  },
};
