require('dotenv').config();

module.exports = {
  prefijo: '!',
  token: process.env.BOT_TOKEN,
  lavapassword: process.env.LAVALINK_PASSWORD,
  nodos: [
    {
      id: '1',
      host: 'localhost',
      port: 2333,
      password: this.lavapassword,
    },
  ],
};
