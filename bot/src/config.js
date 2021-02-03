require('dotenv').config();

module.exports = {
  prefix: '!',
  token: process.env.BOT_TOKEN,
  nodes: [
    {
      host: 'localhost',
      password: process.env.LAVALINK_PASSWORD,
      port: 2333,
    },
  ],
};
