module.exports = {
  name: 'skip',
  music: true,
  deleteMsg: true,
  aliases: ['s', 'sk'],
  description: 'Salta a la siguiente canción de la cola.',
  execute(msg) {
    const { channel } = msg.member.voice;

    const player = msg.client.manager.get(msg.guild.id);
    // Comprueba si existen reproductores en el servidor
    if (!player)
      return msg.reply(
        'No hay reproductores en este servidor.\n' +
          'Utiliza el comando **!play** para empezar a escuchar música.'
      );

    // Comprueba si el usuario se encuentra dentro de un canal de voz
    if (!channel)
      return msg.reply(
        'Necesitas unirte a un canal de voz para ejecutar este comando.'
      );
    // Comprueba si el usuario se encuenetra en el mismo canal de voz
    if (channel.id !== player.voiceChannel)
      return msg.reply(
        'Necesitas estar en el mismo canal de voz para ejecutar este comando.'
      );

    // Comprueba si hay canciones en la cola
    if (!player.queue.current)
      return msg.reply('No se está reproduciendo música en este servidor.');

    player.stop();
    return msg.reply(`Se ha saltado ${player.queue.current.title}`);
  },
  executeReaction(user, player) {
    const { voice } = user;

    // Comprueba si existen reproductores en el servidor
    if (!player) return;

    // Comprueba si el usuario se encuentra dentro de un canal de voz
    if (!voice) return;

    // Comprueba si el usuario se encuenetra en el mismo canal de voz
    if (voice.channelID !== player.voiceChannel) return;

    // Comprueba si hay canciones en la cola
    if (!player.queue.current) return;

    return player.stop();
  },
};
