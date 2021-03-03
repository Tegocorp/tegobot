const { model, Schema } = require('mongoose');

const musicSchema = new Schema({
  queue: { type: Array },
  guildId: { type: String, index: true, unique: true },
  configured: { type: Boolean, default: false },
  playerData: {
    messageId: { type: String },
    textChannelId: { type: String },
    voiceChannelId: { type: String },
  },
});

module.exports = model('Music', musicSchema, 'music_data');
