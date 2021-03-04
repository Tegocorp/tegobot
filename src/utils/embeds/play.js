const { MessageEmbed } = require('discord.js');

const songAdd = (song, queueSize) =>
  new MessageEmbed()
    .setColor('#ffc3c3')
    .addField(
      'Agregada a la cola',
      `${queueSize} - [${song.title}](${song.uri})`
    )
    .setThumbnail(song.displayThumbnail('mqdefault'))
    .setFooter(`Solicitada por ${song.requester.username}`);

const songAddOutside = (channel) =>
  new MessageEmbed()
    .setColor('76AC00')
    .addField(
      'Agregada a la cola',
      `Canal de gestión: ${channel}` +
        '\nDirígete a él para manejar la música de forma interactiva.'
    )
    .setFooter(
      'TIP: Prueba a añadir canciones desde el canal mostrado anteriormente'
    );

const playlistAdd = (song, searchResults, totalSize) =>
  new MessageEmbed()
    .setColor('#ffc3c3')
    .addField(
      'Agregada playlist a la cola',
      `${totalSize} - [${searchResults.playlist.name}](${args.join(' ')})`
    )
    .setFooter(`Solicitada por ${song.requester.username}`);

const playlistAddOutside = () => new MessageEmbed();

module.exports = { songAdd, songAddOutside, playlistAdd, playlistAddOutside };
