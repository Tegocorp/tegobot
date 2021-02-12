const { MessageEmbed } = require('discord.js');

const channelAddEmbed = (channel) =>
  new MessageEmbed()
    .setColor('#ffc3c3')
    .addField(
      'Canal de gestión creado',
      `Nombre del canal: ${channel}` +
        '\nPuedes renombrar y mover el canal a tu gusto.'
    )
    .setFooter('Para obtener ayuda sobre mis comandos debes utilizar !help');

module.exports = { channelAddEmbed };
