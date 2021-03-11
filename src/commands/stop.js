module.exports = {
  name: 'stop',
  music: true,
  execute(msg) {
    const { channel: voiceChannel } = msg.member.voice;

    const manager = msg.client.manager;
    const player = manager.get(msg.guild.id);

    // Realiza las comprobaciones pertinentes antes de ejecutar el comando
    if (!player) return;
    if (!voiceChannel) return;
    if (voiceChannel.id !== player.voiceChannel) return;

    // Destruye el player del servidor
    player.destroy();
    manager.emit('queueEnd', player);

    // Manda mensaje de confirmación
    msg.reply('Se ha parado la reproducción de la cola actual.');
  },
  executeReaction(user, player, manager) {
    const { channel: voiceChannel } = user.voice;

    if (!player) return;
    if (!voiceChannel) return;
    if (voiceChannel.id !== player.voiceChannel) return;

    player.destroy();
    manager.emit('queueEnd', player);
  },
};
