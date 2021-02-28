module.exports = {
  name: 'queueEnd',
  manager: true,
  execute(client, player) {
    const { channels } = client;

    // Obtiene el canal de gestión
    const managementChannel = channels.cache.get(player.textChannel);

    player.destroy();
    return managementChannel.send(
      'La cola ha terminado, saliendo del canal de voz.'
    );
  },
};
