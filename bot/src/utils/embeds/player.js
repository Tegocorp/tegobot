const { MessageEmbed } = require('discord.js');

const player = () =>
  new MessageEmbed()
    .setColor('#ffc3c3')
    .setTitle('No hay canciones reproduciendo')
    .setFooter('Para obtener ayuda sobre mis comandos debes utilizar !help');

const playerWithContent = (song, volume, queueSize) =>
  new MessageEmbed()
    .setColor('#ffc3c3')
    .addField('Reproduciendo de YouTube', `[${song.title}](${song.uri})`)
    .setImage(song.displayThumbnail('hqdefault'))
    .setFooter(
      `Tamaño de cola: ${queueSize} - Volumen: ${volume}% - Solicitada por ${song.requester.username}`
    );

module.exports = { player, playerWithContent };
