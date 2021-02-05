module.exports = {
  name: 'ready',
  execute(client) {
    client.manager.init(client.user.id);
    console.log(`Tegobot se ha iniciado correctamente (${client.user.tag})`);
  },
};
