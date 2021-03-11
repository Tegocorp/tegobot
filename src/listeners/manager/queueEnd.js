const { playerEmbeds } = require('../../utils/embeds');

module.exports = {
  name: 'queueEnd',
  async execute(client, player) {
    const guild = client.guilds.cache.get(player.guild);

    const { music } = guild;

    // Mensaje de gestión
    const playerMessage = music.playerMessage;

    player.destroy();

    const playerEmbed = playerEmbeds.player();

    // Edita el mensaje del reproductor
    return playerMessage.edit(
      'Escribe el nombre/url de la canción a buscar.\n' + '\u200B',
      playerEmbed
    );
  },
};
