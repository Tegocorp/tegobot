const { MessageEmbed } = require('discord.js');

const songAddEmbed = (song, queueSize) =>
  new MessageEmbed()
    .setColor('#ffc3c3')
    .addField(
      'Agregado a la cola',
      `${queueSize} - [${song.title}](${song.uri})`
    )
    .setThumbnail(song.displayThumbnail('mqdefault'))
    .setFooter(`Solicitada por ${song.requester.username}`);

const playlistAddEmbed = (song, searchResults, totalSize) =>
  new MessageEmbed()
    .setColor('#ffc3c3')
    .addField(
      'Agregada playlist a la cola',
      `${totalSize} - [${searchResults.playlist.name}](${args.join(' ')})`
    )
    .setFooter(`Solicitada por ${song.requester.username}`);

module.exports = { songAddEmbed, playlistAddEmbed };
