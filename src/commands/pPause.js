module.exports = {
  name: 'ppause',
  music: true,
  aliases: ['pause', 'resume'],
  execute(msg) {
    const { channel: voiceChannel } = msg.member.voice;

    const player = msg.client.manager.get(msg.guild.id);

    // Realiza las comprobaciones pertinentes antes de ejecutar el comando
    if (!player) return;
    if (!voiceChannel) return;
    if (voiceChannel.id !== player.voiceChannel) return;

    if (!player.paused) {
      player.pause(true);

      return msg.reply('La canción actual ha sido pausada.');
    } else {
      player.pause(false);

      return msg.reply('La reproducción ha sido reanudada.');
    }
  },
  executeReaction(user, player) {
    const { channel: voiceChannel } = user.voice;

    if (!player) return;
    if (!voiceChannel) return;
    if (voiceChannel.id !== player.voiceChannel) return;

    if (!player.paused) player.pause(true);
    else player.pause(false);
  },
};
