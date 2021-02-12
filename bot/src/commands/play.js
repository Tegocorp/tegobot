const { playEmbeds } = require('../utils/embeds');

module.exports = {
  name: 'play',
  args: true,
  cooldown: 5,
  guildOnly: true,
  aliases: ['p', 'pl'],
  permissions: 'ADMINISTRATOR',
  usage: '[url] o [nombre canción]',
  description: 'Reproduce la canción introducida por el usuario.',
  async execute(msg, args) {
    const { music } = msg.guild;
    const { channel } = msg.member.voice;

    // Comprueba si el usuario se encuentra en un canal de voz
    if (!channel)
      return msg.reply(
        'Necesitas unirte a un canal de voz para ejecutar este comando.'
      );

    await music.connect(msg.channel.id, channel.id);

    const searchResults = await music.searchSong(args, msg.author);

    music
      .playRequested(searchResults)
      .then((res) => {
        const player = music.player;
        const song = searchResults.tracks[0];

        switch (res) {
          case 'NO_MATCHES':
            return msg.reply(
              'No se han encontrado resultados sobre tu busqueda.'
            );
          case 'TRACK_LOADED':
            // Mensaje que se enviará al agregar una canción a la cola
            const songAddEmbed = playEmbeds.songAddEmbed(
              song,
              player.queue.totalSize
            );
            // Easteregg de Tego Calderón al reproducir una canción suya
            if (song.title.toLowerCase().includes('tego')) {
              songAddEmbed.addField(
                'Frase de Tego Calderón',
                'Yo soy el maracachimba, el feo de las nenas lindas.'
              );
            }

            return msg.channel.send(songAddEmbed);
          case 'PLAYLIST_LOADED':
            // Mensaje que se enviará al agregar una playlist a la cola
            const playlistAddEmbed = playEmbeds.playlistAddEmbed(
              song,
              searchResults,
              player.queue.totalSize
            );

            return msg.channel.send(playlistAddEmbed);
        }
      })
      .catch((error) => {
        msg.reply(
          `Ha ocurrido un error mientras se buscaba la canción: ${error.message}`
        );
      });
  },
};
