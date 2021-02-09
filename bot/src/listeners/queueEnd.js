module.exports = {
  name: 'queueEnd',
  manager: true,
  execute(client, player) {
    const channel = client.channels.cache.get(player.textChannel);
    channel.send('La cola ha terminado, saliendo del canal de voz.');
    player.destroy();
  },
};
