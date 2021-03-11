const { statusEmbeds } = require('../utils/embeds');

module.exports = {
  name: 'status',
  description: 'Muestra el funcionamiento actual de los nodos Lavalink.',
  execute(msg) {
    // Obtiene array de todos los nodos cargados
    const nodes = [...msg.client.manager.nodes.values()];

    // Embed que se enviará al ejecutar el comando
    const statusEmbed = statusEmbeds.statusEmbed(nodes);

    msg.channel.send(statusEmbed);
  },
};
