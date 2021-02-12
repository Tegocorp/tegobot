const { model, Schema } = require('mongoose');

const musicSchema = new Schema({
  guildId: { type: String, index: true, unique: true },
  textChannelId: { type: String },
  voiceChannelId: { type: String },
});

module.exports = model('Music', musicSchema, 'music_data');
