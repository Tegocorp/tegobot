module.exports = {
  name: 'nodeError',
  execute(client, node, error) {
    // Obtiene el identificador del nodo Lavalink
    const nodeId = node.options.identifier;

    console.log(
      `Ha ocurrido un error en el nodo (${nodeId}): ${error.message}`
    );
  },
};
