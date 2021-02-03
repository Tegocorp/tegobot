const { token, nodes } = require('../config');

const { Manager } = require('erela.js');
const { Client } = require('discord.js');

/** Clase TegoClient */
module.exports = class TegoClient extends Client {
  /**
   * Constructor de la clase TegoClient
   * @param {Object} opt
   */
  constructor(opt) {
    super(opt);
    this.manager = new Manager({
      nodes: nodes,
      send: (id, payload) => {
        const guild = this.guilds.cache.get(id);
        if (guild) guild.shard.send(payload);
      },
    });
  }

  /** Prepara los eventos del cliente */
  _setupClientEvents() {
    this.once('ready', () => {
      this.manager.init(this.user.id);
      console.log(`Tegobot se ha iniciado correctamente (${this.user.tag})`);
    });

    this.on('raw', (d) => this.manager.updateVoiceState(d));
  }

  /** Prepara los eventos del cliente erela  */
  _setupManagerEvents() {
    const nodeId = (node) => node.options.identifier;

    this.manager.on('nodeConnect', (node) =>
      console.log(`Nodo (${nodeId(node)}) de Lavalink conectado correctamente`)
    );

    this.manager.on('nodeError', (node, error) =>
      console.log(
        `Se ha encontrado un error en el nodo ${nodeId(node)}: ${error.message}`
      )
    );
  }

  /** Inicializa el cliente discord.js con Lavalink (erela) */
  initialize() {
    this.login(token);
    this._setupClientEvents();
    this._setupManagerEvents();
  }
};
