module.exports = {
  name: 'shuffle',
  music: true,
  execute(msg) {
    const { channel: voiceChannel } = msg.member.voice;

    const player = msg.client.manager.get(msg.guild.id);

    // Realiza las comprobaciones pertinentes antes de ejecutar el comando
    if (!player) return;
    if (!voiceChannel) return;
    if (voiceChannel.id !== player.voiceChannel) return;

    // Mezcla las canciones de la cola
    player.queue.shuffle();

    // Manda mensaje de confirmación
    msg.reply('Se han mezclado las canciones de la cola actual.');
  },
  executeReaction(user, player) {
    const { channel: voiceChannel } = user.voice;

    // Realiza las comprobaciones pertinentes antes de ejecutar el comando
    if (!player) return;
    if (!voiceChannel) return;
    if (voiceChannel.id !== player.voiceChannel) return;

    // Mezcla las canciones de la cola
    player.queue.shuffle();
  },
};
