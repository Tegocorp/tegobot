require('dotenv').config();

module.exports = {
  bot: {
    prefix: '!',
    token: process.env.BOT_TOKEN,
    lavalinkNodes: [
      {
        host: 'localhost',
        password: process.env.LAVALINK_PASSWORD,
        port: 2333,
      },
    ],
  },
  api: {
    clientID: process.env.DASHBOARD_CLIENT_ID,
    clientSecret: process.env.DASHBOARD_CLIENT_SECRET,
    callback: process.env.DASBOARD_CALLBACK_URL,
  },
  spotify: {
    clientID: process.env.SPOTIFY_CLIENT_ID,
    clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
  },
};
