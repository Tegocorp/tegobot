const { playerEmbeds } = require('../utils/embeds');

module.exports = {
  name: 'trackStart',
  manager: true,
  execute(client, player, track, payload) {
    const { channels } = client;

    // Obtiene el canal de gestión
    const managementChannel = channels.cache.get(player.textChannel);
    // Nombre de la canción cortado
    const trackName = `[${player.queue.length + 1}] ${track.title.slice(
      0,
      56
    )}...`;

    return managementChannel.send(trackName);
  },
};
