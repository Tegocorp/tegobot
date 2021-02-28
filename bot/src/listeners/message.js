const { prefix: basePrefix } = require('../config');

module.exports = {
  name: 'message',
  async execute(client, msg) {
    // Comprueba si el comando debe ejecutarse
    if (!msg.content.startsWith(basePrefix) || msg.author.bot) return;

    // Obtiene el nombre del comando y los argumentos
    const args = msg.content.slice(basePrefix.length).trim().split(/ +/);
    const commandName = args.shift().toLocaleLowerCase();

    // Obtiene el comando introducido por el usuario
    const commands = client.commands;
    const command =
      commands.get(commandName) ||
      commands.find((cmd) => cmd.aliases && cmd.aliases.includes(commandName));

    if (!command) return;

    // Comprueba si debe actualizar los datos del servidor
    if (command.music) {
      const { music, channels } = msg.guild;
      await music.checkServerData();

      // Datos del servidor
      const musicData = music.serverData;
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

        if (msg.channel.id !== musicData.player.textChannel)
          command.noManagementChannel = true;
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
