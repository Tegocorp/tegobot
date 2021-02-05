module.exports = {
  name: 'raw',
  execute(client, d) {
    client.manager.updateVoiceState(d);
  },
};
