const apiRest = require('../../api');

module.exports = {
  name: 'ready',
  execute(client) {
    apiRest(client);

    client.manager.init(client.user.id);
    client.user.setActivity('!help', { type: 'LISTENING' });

    console.log(
      `Conectado a (${client.guilds.cache.size}) servidores con TAG (${client.user.tag})`
    );
  },
};
