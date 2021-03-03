const Music = require('../../repository/mongo/models/Music');

module.exports = {
  name: 'trackEnd',
  async execute(client, player, track, payload) {
    const guild = client.guilds.cache.get(player.guild);

    const { id } = guild;

    const musicFilter = { guildId: id };
    const musicUpdate = { $pull: { queue: track } };

    // Elimina el objecto track dentro de la array
    await Music.updateOne(musicFilter, musicUpdate);
  },
};
