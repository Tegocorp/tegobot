const { model, Schema } = require('mongoose');

const MusicSchema = new Schema({
  guildId: { type: String, index: true, unique: true },
  configured: { type: Boolean, default: false },
  playerData: {
    messageId: { type: String },
    textChannelId: { type: String },
    voiceChannelId: { type: String },
  },
});

module.exports = model('Music', MusicSchema, 'music_data');
