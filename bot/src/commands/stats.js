const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'stats',
  description: 'Muestra el funcionamiento actual de los nodos Lavalink.',
  execute(msg) {
    // Obtiene array de todos los nodos cargados
    const nodes = [...msg.client.manager.nodes.values()];

    // Mensaje que se enviará al ejecutar el comando
    const nodesInfo = new MessageEmbed().setColor('#ffc3c3').addField(
      'Información sobre los nodos',
      nodes.map((node) => {
        const uptime = node.stats.uptime;
        const cpuLoad = (node.stats.cpu.lavalinkLoad * 100).toFixed(2);
        const memoryUsage = (node.stats.memory.used / 1024 / 1024).toFixed(2);

        return fieldMsg(node, uptime, cpuLoad, memoryUsage);
      })
    );

    msg.channel.send(nodesInfo);
  },
};

// Fila de nodesInfo (comprobar indentación en el futuro)
const fieldMsg = (node, uptime, cpu, memory) =>
  `\`\`\`asciidoc
Nodo           : ${node.options.host}
Estado         : ${node.connected ? 'conectado' : 'desconectado'}
   ${
     node.connected
       ? `
Carga CPU      : ${cpu}%
Uso memoria    : ${memory} MB
En ejecución   : ${uptime}
Reproductores  : ${node.stats.playingPlayers} de ${node.stats.players} reproduciendo `
       : ''
   }\`\`\``;
