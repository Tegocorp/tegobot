const { Structures } = require('discord.js');
const MusicManager = require('../structures/MusicManager');

const Guild = Structures.get('Guild');

/** Clase TegoGuild */
class TegoGuild extends Guild {
  /**
   * Constructor de la clase TegoGuild
   * @param {Object} client
   * @param {Object} data
   */
  constructor(client, data) {
    super(client, data);
    this.music = new MusicManager(this);
  }
}

Structures.extend('Guild', () => TegoGuild);
