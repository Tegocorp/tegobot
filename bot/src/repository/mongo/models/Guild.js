const { model, Schema } = require('mongoose');

const guildSchema = new Schema({
  guildId: { type: String },
  textChannelId: { type: String },
  voiceChannelId: { type: String },
});

module.exports = model('Guild', guildSchema);
