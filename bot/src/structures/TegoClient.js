const { botUserId, token, nodes } = require('../config');

const { Manager } = require('lavacord');
const { Client } = require('discord.js');

/** Clase TegoClient */
class TegoClient extends Client {
  /**
   * Constructor de la clase TegoClient
   * @param {string} opt
   */
  constructor(opt) {
    super(opt);
    this.manager = new Manager(nodes, {
      user: botUserId,
      shards: 1,
    });
  }

  /** Inicializar Cliente discord.js con Lavalink */
  initialize() {
    this.login(token);

    this.on('ready', async () => {
      console.log(`Tegobot se ha iniciado correctamente (${this.user.tag})`);
      await this.manager.connect();
    });

    this.manager
      .on('ready', (node) =>
        console.log(
          `La conexión con el nodo de Lavalink (id -> ${node.id}) está activa`
        )
      )
      .on('error', (err, node) =>
        console.log(
          `Ha ocurrido el siguiente error -> ${err.message}, en el nodo ${node}`
        )
      );
  }
}

module.exports = TegoClient;
