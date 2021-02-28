const Music = require('../repository/mongo/models/Music');

module.exports = {
  name: 'channelDelete',
  async execute(client, channel) {
    if (channel.name === 'tego-music')
      await Music.deleteOne({ guildId: channel.guild.id });
  },
};
