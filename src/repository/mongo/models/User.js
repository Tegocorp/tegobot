const { model, Schema } = require('mongoose');

const UserSchema = new Schema({
  userId: { type: String, required: true, unique: true },
  discordTag: { type: String, required: true },
  avatar: { type: String, required: true },
  guilds: { type: Array, required: true },
});

module.exports = model('User', UserSchema, 'users_data');
