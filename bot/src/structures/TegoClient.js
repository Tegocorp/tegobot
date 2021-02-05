const fs = require('fs');
const { join } = require('path');
const { Manager } = require('erela.js');
const { Client, Collection } = require('discord.js');

const { nodes, token } = require('../config');

/** Clase TegoClient */
module.exports = class TegoClient extends Client {
  /**
   * Constructor de la clase TegoClient
   * @param {Object} opt
   */
  constructor(opt) {
    super(opt);
    this.commands = new Collection();
    this.cooldowns = new Collection();
    this.manager = new Manager({
      nodes: nodes,
      send: (id, payload) => {
        const guild = this.guilds.cache.get(id);
        if (guild) guild.shard.send(payload);
      },
    });
  }

  /** Registra los comandos en la colección commands */
  addCommandsToCollection() {
    const commandFiles = fs
      .readdirSync(join(__dirname, '..', 'commands'))
      .filter((file) => file.endsWith('.js'));

    for (const file of commandFiles) {
      const command = require(`../commands/${file}`);
      this.commands.set(command.name, command);
    }
  }

  /** Prepara los eventos del cliente */
  _setupClientEvents() {
    const listenerFiles = fs
      .readdirSync(join(__dirname, '..', 'listeners'))
      .filter((file) => file.endsWith('.js'));

    for (const file of listenerFiles) {
      const listener = require(`../listeners/${file}`);
      this.on(listener.name, (...args) => listener.execute(this, ...args));
    }
  }

  /** Prepara los eventos del cliente erela  */
  _setupManagerEvents() {
    // Función que obtiene el identificador del nodo Lavalink
    const nodeId = (node) => node.options.identifier;

    this.manager.on('nodeConnect', (node) =>
      console.log(
        `Conectado al nodo de Lavalink (${nodeId(node)}) correctamente`
      )
    );

    this.manager.on('nodeError', (node, error) =>
      console.log(
        `Ha ocurrido un error en el nodo (${nodeId(node)}): ${error.message}`
      )
    );
  }

  /** Inicializa el cliente discord.js con Lavalink (erela) */
  initialize() {
    this.login(token);
    this._setupClientEvents();
    this._setupManagerEvents();
    this.addCommandsToCollection();
  }
};
