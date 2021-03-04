const { playerEmbeds } = require('../../utils/embeds');
const Music = require('../../repository/mongo/models/Music');

module.exports = {
  name: 'channelCreate',
  execute(client, channel) {
    if (channel.name === 'tego-music')
      channel
        .send('Escribe el nombre/url de la canción a buscar.\n' + '\u200B', {
          embed: playerEmbeds.player(),
        })
        .then(async (msg) => {
          const musicFilter = { guildId: channel.guild.id };
          const musicUpdate = { 'playerData.messageId': msg.id };

          await Music.updateOne(musicFilter, musicUpdate);

          return msg
            .react('⏹')
            .then(() => msg.react('⏯️'))
            .then(() => msg.react('⏭️'))
            .then(() => msg.react('🔀'));
        });
  },
};
