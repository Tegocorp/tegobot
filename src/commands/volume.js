module.exports = {
  name: 'volume',
  execute(msg, args) {
    const { channel: voiceChannel } = msg.member.voice;

    const player = msg.client.manager.get(msg.guild.id);

    // Realiza las comprobaciones pertinentes antes de ejecutar el comando
    if (!player) return;
    if (!voiceChannel) return;
    if (voiceChannel.id !== player.voiceChannel) return;

    const volume = args[0];

    if (!volume || volume < 1 || volume > 100)
      return msg.reply('Debes espeficificar un valor entre 1 y 100.');

    player.setVolume(volume);
    return msg.reply(
      `El volumen del reproductor ha sido establecido a \`${volume}\``
    );
  },
};
