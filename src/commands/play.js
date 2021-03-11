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

    music.playRequested(searchResults).then((res) => {
      switch (res) {
        case 'NO_MATCHES':
          // Mensaje que se enviará si no se han encontrado resultados
          const msgContent =
            'No se han encontrado resultados sobre tu busqueda.';

          if (this.isManagementChannel) return msg.delete();
          else return sendMessage(msg, 'reply', msgContent, this.deleteMsg);
        case 'TRACK_LOADED':
          // Embed que se enviará si el mensaje ha sido enviado fuera
          const songAddOutside = playEmbeds.songAddOutside(managementChannel);

          if (this.isManagementChannel) return msg.delete();
          else
            return sendMessage(msg, 'default', songAddOutside, this.deleteMsg);
        case 'PLAYLIST_LOADED':
          // Embed que se enviará al agregar una playlist a la cola
          const playlistAdd = playEmbeds.playlistAddOutside(
            args[0],
            searchResults
          );

          if (this.isManagementChannel) return msg.delete();
          else return sendMessage(msg, 'default', playlistAdd, this.deleteMsg);
      }
    });
  },
};
