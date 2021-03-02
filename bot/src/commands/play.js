const { sendMessage } = require('../utils');
const { playEmbeds } = require('../utils/embeds');

module.exports = {
  name: 'play',
  music: true,
  deleteMsg: true,
  aliases: ['p', 'pl'],
  description: 'Reproduce la canción introducida por el usuario.',
  async execute(msg, args) {
    const { channel } = msg.member.voice;
    const { music, channels } = msg.guild;

    // Datos del servidor
    const musicData = music.serverData;
    // Obtiene el canal de gestión
    const managementChannel = channels.cache.get(musicData.player.textChannel);

    // Comprueba si el usuario se encuentra en un canal de voz
    if (!channel)
      return msg.reply(
        'Necesitas unirte a un canal de voz para ejecutar este comando.'
      );

    music.connect(musicData.player.textChannel, channel.id);

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
            const songAdd = playEmbeds.songAdd(song, player.queue.totalSize);

            // Mensaje que se enviará si el mensaje ha sido enviado fuera
            const songAddOutside = playEmbeds.songAddOutside(managementChannel);

            // Easteregg de Tego Calderón al reproducir una canción suya
            if (song.title.toLowerCase().includes('tego')) {
              songAdd.addField(
                'Frase de Tego Calderón',
                'Yo soy el maracachimba, el feo de las nenas lindas.'
              );
            }

            if (this.isManagementChannel) return msg.delete();
            else
              return sendMessage(
                msg,
                'default',
                songAddOutside,
                this.deleteMsg
              );
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
