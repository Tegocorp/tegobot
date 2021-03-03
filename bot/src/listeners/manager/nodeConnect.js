module.exports = {
  name: 'nodeConnect',
  execute(client, node) {
    // Obtiene el identificador del nodo Lavalink
    const nodeId = node.options.identifier;

    console.log(`Conectado al nodo de Lavalink (${nodeId}) correctamente`);
  },
};
