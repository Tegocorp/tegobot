const { setupEmbeds } = require('../utils/embeds');
const Music = require('../repository/mongo/models/Music');

module.exports = {
  name: 'setup',
  music: true,
  description: 'Configuración inicial para la reproducción de música.',
  async execute(msg) {
    const { music, channels } = msg.guild;

    // Datos del servidor
    const musicData = music.serverData;
    // Obtiene el canal de gestión
    const managementChannel = channels.cache.get(musicData.player.textChannel);

    // Comprueba si el servidor ya ha sido configurado anteriormente
    if (musicData.guildId && !musicData.configured) {
      channels.create('tego-music', 'text').then(async (channel) => {
        const musicFilter = { guildId: musicData.guildId };
        const musicUpdate = {
          configured: true,
          'playerData.textChannelId': channel.id,
        };

        await Music.updateOne(musicFilter, musicUpdate);

        // Envía el mensaje de confirmación
        const setupEmbed = setupEmbeds.setupEmbed(channel.toString());
        return msg.channel.send(setupEmbed);
      });
    } else {
      if (managementChannel)
        return msg.reply(
          'Este servidor ya ha sido configurado anteriormente.\n' +
            `Puedes interactuar conmigo en el siguiente canal ${managementChannel.toString()}`
        );
    }
  },
};
