require('dotenv').config();

module.exports = {
  prefix: '!',
  token: process.env.BOT_TOKEN,
  botUserId: process.env.BOT_USER_ID,
  lavapassword: process.env.LAVALINK_PASSWORD,
  nodes: [
    {
      id: '1',
      host: 'localhost',
      port: 2333,
      password: this.lavapassword,
    },
  ],
};
