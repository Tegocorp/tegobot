const { model, Schema } = require('mongoose');

const guildSchema = new Schema({
  guildId: { type: String, index: true, unique: true },
  prefix: { type: String },
  language: { type: String, default: 'en' },
});

module.exports = model('Guild', guildSchema, 'guilds_data');
