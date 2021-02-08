module.exports = {
  name: 'ready',
  execute(client) {
    client.manager.init(client.user.id);

    console.log(
      `Conectado a (${client.guilds.cache.size}) servidores con TAG (${client.user.tag})`
    );

    client.user.setActivity('!help', { type: 'LISTENING' });
  },
};
