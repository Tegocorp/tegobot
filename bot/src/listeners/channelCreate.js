const { playerEmbeds } = require('../utils/embeds');
const Music = require('../repository/mongo/models/Music');

module.exports = {
  name: 'channelCreate',
  execute(client, channel) {
    if (channel.name === 'tego-music')
      channel
        .send(
          'Unete a un canal de voz y escribe el nombre/url de la canción a buscar.',
          { embed: playerEmbeds.player() }
        )
        .then(async (msg) => {
          const musicFilter = { guildId: channel.guild.id };
          const musicUpdate = {
            'playerData.messageId': msg.id,
          };

          await Music.findOneAndUpdate(musicFilter, musicUpdate);
        });
  },
};
