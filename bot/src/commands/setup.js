const { setupEmbeds } = require('../utils/embeds');

const Music = require('../repository/mongo/models/Music');

module.exports = {
  name: 'setup',
  guildOnly: true,
  permissions: 'ADMINISTRATOR',
  description: 'Configuración inicial para la reproducción de música.',
  async execute(msg) {
    const { music, channels } = msg.guild;

    await music.checkServerData();
    const serverData = music.serverData;

    // Comprueba si aún no existe textChannel en el servidor
    if (serverData.guildId && !serverData.textChannel) {
      // Crea el canal de texto donde se interactuará con el bot
      channels.create('tego-music', 'text').then(async (channel) => {
        // Añade los datos del nuevo canal de texto
        serverData.textChannel = channel.id;

        const filter = { guildId: serverData.guildId };
        const update = { $set: { textChannelId: channel.id } };

        await Music.findOneAndUpdate(filter, update);

        // Envía el mensaje de creación
        return msg.channel.send(setupEmbeds.channelAddEmbed(channel));
      });
    } else {
      const channel = channels.cache.get(serverData.textChannel);

      if (channel)
        // Envía el canal en caso de ya existir
        return msg.reply(
          'Este servidor ya ha sido configurado anteriormente.\n' +
            `Puedes interactuar conmigo en el siguiente canal ${channel}`
        );
      else {
        // Comprueba si el canal de gestión ha sido eliminado
        await Music.deleteOne({ guildId: serverData.guildId });

        return msg.reply(
          'El canal de gestión ha sido eliminado, por favor, vuelve a ejecutar **!setup**'
        );
      }
    }
  },
};
