const { MessageEmbed } = require('discord.js');

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

const playlistAddOutside = (url, searchResults) =>
  new MessageEmbed()
    .setColor('#ffc3c3')
    .addField(
      'Playlist agregada a la cola',
      `${searchResults.tracks.length} - [${searchResults.playlist.name}](${url})`
    )
    .setFooter(`Solicitada por ${searchResults.tracks[0].requester.username}`);

module.exports = { songAddOutside, playlistAddOutside };
