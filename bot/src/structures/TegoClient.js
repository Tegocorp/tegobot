const fs = require('fs');
const { join } = require('path');
const { Manager } = require('erela.js');
const { Client, Collection } = require('discord.js');

const { nodes, prefix, token } = require('../config');

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
    this.once('ready', () => {
      this.manager.init(this.user.id);
      console.log(`Tegobot se ha iniciado correctamente (${this.user.tag})`);
    });

    this.on('message', (msg) => {
      // Comprueba si es un mensaje válido para ser ejecutado
      if (!msg.content.startsWith(prefix) || msg.author.bot) return;

      // Obtiene el nombre del comando y los argumentos
      const args = msg.content.slice(prefix.length).trim().split(/ +/);
      const commandName = args.shift().toLocaleLowerCase();

      const command =
        this.commands.get(commandName) ||
        this.commands.find(
          (cmd) => cmd.aliases && cmd.aliases.includes(commandName)
        );

      if (!command) return;

      // Comprueba si el comando solo puede ejecutarse en servidores
      if (command.guildOnly && msg.channel.type === 'dm')
        return msg.reply(
          'No puedo ejecutar este comando dentro de mensajes privados.'
        );

      // Comprueba si se le han otorgado los permisos necesarios al usuario
      if (command.permissions) {
        const authorPerms = msg.channel.permissionsFor(msg.author);
        if (!authorPerms || !authorPerms.has(command.permissions)) {
          return msg.reply(
            `No tienes los permisos necesarios para ejecutar este comando ${msg.author}`
          );
        }
      }

      // Comprueba si no se han especificado argumentos en el mensaje
      if (command.args && !args.length) {
        let reply = `No has especificado ningún argumento ${msg.author}`;

        if (command.usage) {
          reply += `\nEl uso adecuado sería: ${prefix}${commandName} ${command.usage}`;
        }

        return msg.channel.send(reply);
      }

      // Realiza las comprobaciones de cooldown pertinentes
      if (!this.cooldowns.has(command.name)) {
        this.cooldowns.set(command.name, new Collection());
      }

      const now = Date.now();
      const timestamps = this.cooldowns.get(command.name);
      const cooldownAmount = (command.cooldown || 3) * 1000;

      if (timestamps.has(msg.author.id)) {
        const expirationTime = timestamps.get(msg.author.id) + cooldownAmount;

        if (now < expirationTime) {
          const timeLeft = (expirationTime - now) / 1000;
          return msg.reply(
            `por favor espera ${timeLeft.toFixed(
              1
            )} segundo(s) antes de reusar el comando (${command.name}).`
          );
        }
      }

      timestamps.set(msg.author.id, now);
      setTimeout(() => timestamps.delete(msg.author.id), cooldownAmount);

      // Realiza la ejecución del comando
      try {
        command.execute(msg, args);
      } catch (error) {
        console.error(
          `Ha ocurrido un error al tratar de ejecutar el comando (${command}): ${error.message}`
        );
      }
    });

    this.on('raw', (d) => this.manager.updateVoiceState(d));
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
