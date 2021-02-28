const { MessageEmbed } = require('discord.js');

const player = () =>
  new MessageEmbed()
    .setColor('#ffc3c3')
    .setFooter(`Hola buenas tardes saludos`);

module.exports = { player };
