const { playerEmbeds } = require('../utils/embeds');

module.exports = {
  name: 'trackStart',
  manager: true,
  execute(client, player, track, payload) {
    const guild = client.guilds.cache.get(player.guild);

    const { music } = guild;

    // Mensaje de gestión
    const playerMessage = music.playerMessage;

    const playerWithContent = playerEmbeds.playerWithContent(
      track,
      player.volume,
      1
    );
    return playerMessage.edit(playerWithContent);
  },
};
