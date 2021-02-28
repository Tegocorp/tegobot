const { playerEmbeds } = require('../utils/embeds');

module.exports = {
  name: 'queueEnd',
  manager: true,
  execute(client, player) {
    const guild = client.guilds.cache.get(player.guild);

    const { music } = guild;

    // Mensaje de gestión
    const playerMessage = music.playerMessage;

    player.destroy();

    const playerEmbed = playerEmbeds.player();
    return playerMessage.edit(playerEmbed);
  },
};
