const { MessageEmbed } = require('discord.js');

const statusEmbed = (nodes) =>
  new MessageEmbed().setColor('#ffc3c3').addField(
    'Información sobre los nodos',
    nodes.map((node) => {
      const uptime = node.stats.uptime;
      const cpuLoad = (node.stats.cpu.lavalinkLoad * 100).toFixed(2);
      const memoryUsage = (node.stats.memory.used / 1024 / 1024).toFixed(2);

      return fieldMsg(node, uptime, cpuLoad, memoryUsage);
    })
  );

// Fila de statusEmbed
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

module.exports = { statusEmbed };
