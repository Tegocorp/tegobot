const { Structures } = require('discord.js');
const TegoMusic = require('../structures/TegoMusic');

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
    this.music = new TegoMusic(this);
  }
}

Structures.extend('Guild', () => TegoGuild);
