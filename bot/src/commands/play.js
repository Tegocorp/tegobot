module.exports = {
  name: 'music-play',
  args: true,
  cooldown: 5,
  guildOnly: true,
  aliases: ['p', 'play'],
  permissions: 'ADMINISTRATOR',
  usage: '[url] o [nombre canción]',
  description: 'Reproduce la canción introducida por el usuario.',
  async execute(msg, args) {
    const music = msg.client.manager;
    const { channel } = msg.member.voice;

    // Comprueba si el usuario se encuentra dentro de un canal de voz
    if (!channel)
      return msg.reply(
        'Necesitas unirte a un canal de voz para ejecutar este comando.'
      );

    // Crea el reproductor
    const player = music.create({
      guild: msg.guild.id,
      voiceChannel: channel.id,
      textChannel: msg.channel.id,
    });

    // Comprueba si ya se ha creado un reproductor en el servidor
    if (player.state !== 'CONNECTED') player.connect();

    let res;
    const search = args.join(' ');

    try {
      // Busca canciones mediante una consulta o URL
      res = await player.search(search, msg.author);
      // Comprueba si la busqueda ha fallado y elimina el reproductor
      if (res.loadType === 'LOAD_FAILED') {
        if (!player.queue.current) player.destroy();
        throw res.exception;
      }
    } catch (error) {
      return msg.reply(
        `Ha ocurrido un error mientras se buscaba la canción: ${error.message}`
      );
    }

    switch (res.loadType) {
      // Ejecuta cuando no ha encontrado resultados con los terminos introducidos
      case 'NO_MATCHES':
        if (!player.queue.current) player.destroy();
        return msg.reply('No se han encontrado resultados sobre tu busqueda.');
      // Ejecuta cuando ha encontado resultados (url, consulta)
      case 'TRACK_LOADED':
      case 'SEARCH_RESULT':
        player.queue.add(res.tracks[0]);

        if (!player.playing && !player.paused && !player.queue.size)
          player.play();
        return msg.reply(`Añadiendo ${res.tracks[0].title} a la cola.`);
      // Ejecuta cuando se ha cargado la playlist introducida
      case 'PLAYLIST_LOADED':
        player.queue.add(res.tracks);

        if (
          !player.playing &&
          !player.paused &&
          player.queue.totalSize === res.tracks.length
        )
          player.play();
        return msg.reply(
          `Añadiendo playlist ${res.playlist.name} | (${res.tracks.length}) a la cola.`
        );
    }
  },
};
