const { MessageEmbed } = require('discord.js');

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

    if (!channel)
      return msg.reply(
        'Necesitas unirte a un canal de voz para ejecutar este comando.'
      );

    music.connect(msg.channel.id, channel.id);

    const searchResults = await music.searchSong(args, msg.author);

    music
      .playRequested(searchResults)
      .then((res) => {
        const player = music.player;
        const song = searchResults.tracks[0];

        if (res === 'NO_MATCHES')
          return msg.reply(
            'No se han encontrado resultados sobre tu busqueda.'
          );
        else if (res === 'TRACK_LOADED') {
          // Mensaje que se enviará al agregar una canción a la cola
          const songAddEmbed = new MessageEmbed()
            .setColor('#ffc3c3')
            .addField(
              'Agregado a la cola',
              `${player.queue.totalSize} - [${song.title}](${song.uri})`
            )
            .setThumbnail(song.displayThumbnail('mqdefault'))
            .setFooter(`Solicitada por ${song.requester.username}`);
          // Easteregg de Tego Calderón al reproducir una canción suya
          if (song.title.toLowerCase().includes('tego')) {
            songAddEmbed.addField(
              'Frase de Tego Calderón',
              'Yo soy el maracachimba, el feo de las nenas lindas.'
            );
          }

          return msg.channel.send(songAddEmbed);
        } else if (res === 'PLAYLIST_LOADED') {
          // Mensaje que se enviará al agregar una playlist a la cola
          const playlistAddEmbed = new MessageEmbed()
            .setColor('#ffc3c3')
            .addField(
              'Agregada playlist a la cola',
              `${player.queue.totalSize} - [${
                searchResults.playlist.name
              }](${args.join(' ')})`
            )
            .setFooter(`Solicitada por ${song.requester.username}`);

          return msg.channel.send(playlistAddEmbed);
        }
      })
      .catch((error) => {
        console.log(error);
        msg.reply(
          `Ha ocurrido un error mientras se buscaba la canción: ${error.message}`
        );
      });
  },
};
