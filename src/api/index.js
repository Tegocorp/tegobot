require('./app');

const userRoutes = require('./routes/dashboard/user');
const guildRoutes = require('./routes/dashboard/guild');

module.exports = (client) => {
  userRoutes.setClient(client);
  guildRoutes.setClient(client);
};
