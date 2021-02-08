const { MessageEmbed } = require('discord.js');

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

    const song = res.tracks[0];

    switch (res.loadType) {
      // Ejecuta cuando no ha encontrado resultados con los terminos introducidos
      case 'NO_MATCHES':
        if (!player.queue.current) player.destroy();
        return msg.reply('No se han encontrado resultados sobre tu busqueda.');
      // Ejecuta cuando ha encontado resultados (url, consulta)
      case 'TRACK_LOADED':
      case 'SEARCH_RESULT':
        player.queue.add(song);

        if (!player.playing && !player.paused && !player.queue.size)
          player.play();

        // Mensaje que se enviará al agregar una canción a la cola
        const songAddEmbed = new MessageEmbed()
          .setColor('#ffc3c3')
          .addField(
            'Agregado a la cola',
            `${player.queue.totalSize} - [${song.title}](${song.uri})`
          )
          .setThumbnail(song.thumbnail)
          .setFooter(`Solicitada por ${song.requester.username}`);
        // Easteregg de Tego Calderón al reproducir una canción suya
        if (song.title.toLowerCase().includes('tego')) {
          songAddEmbed.addField(
            'Frase de Tego Calderón',
            'Yo soy el maracachimba, el feo de las nenas lindas.'
          );
        }

        return msg.channel.send(songAddEmbed);
      // Ejecuta cuando se ha cargado la playlist introducida
      case 'PLAYLIST_LOADED':
        player.queue.add(res.tracks);

        if (
          !player.playing &&
          !player.paused &&
          player.queue.totalSize === res.tracks.length
        )
          player.play();

        // Mensaje que se enviará al agregar una playlist a la cola
        const playlistAddEmbed = new MessageEmbed()
          .setColor('#ffc3c3')
          .addField(
            'Agregada playlist a la cola',
            `${player.queue.totalSize} - [${res.playlist.name}](${search})`
          )
          .setFooter(`Solicitada por ${song.requester.username}`);

        return msg.channel.send(playlistAddEmbed);
    }
  },
};
