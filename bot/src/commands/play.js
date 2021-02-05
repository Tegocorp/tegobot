module.exports = {
  name: 'music-play',
  args: true,
  music: true,
  cooldown: 5,
  guildOnly: true,
  aliases: ['p', 'play'],
  permissions: 'ADMINISTRATOR',
  usage: '[url] o [nombre canción]',
  description: 'Reproduce la canción introducida por el usuario.',
  async execute(msg, args, manager) {
    // Comprueba si el usuario se encuentra dentro de un canal de voz
    if (!msg.member.voice.channel) return msg.reply('entra a canal de voz');

    let res;

    try {
      // Busca canciones mediante una consulta o URL
      res = await manager.search(args, msg.author);
      // Comprueba el tipo de carga (error y playlist no permitido)
      if (res.loadType === 'LOAD_FAILED') throw res.exception;
      else if (res.loadType === 'PLAYLIST_LOADED') {
        const errorMessage = {
          message:
            'La listas de reproducción no son compatibles con este comando.',
        };
        throw errorMessage;
      }
    } catch (error) {
      return msg.reply(
        `Ha ocurrido un error mientras se buscaba la canción: ${error.message}`
      );
    }

    // Crea el reproductor
    const player = manager.create({
      guild: msg.guild.id,
      voiceChannel: msg.member.voice.channel.id,
      textChannel: msg.channel.id,
    });

    // Se conecta con el canal de voz y añade la canción a la cola
    player.connect();
    player.queue.add(res.tracks[0]);

    // Comprueba si el cliente debe reproducir la canción (primera agregada)
    if (!player.playing && !player.paused && !player.queue.size) player.play();

    return msg.reply(`Añadiendo ${res.tracks[0].title} a la cola.`);
  },
};
