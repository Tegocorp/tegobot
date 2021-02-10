module.exports = class MusicManager {
  /**
   * Constructor de la clase MusicManager
   * @param {Object} guild
   */
  constructor(guild) {
    this.guild = guild;
    this.textChannel = null;
    this.voiceChannel = null;
  }

  /** Devuelve el objeto cliente */
  get client() {
    return this.guild.client;
  }

  /** Devuelve el objeto player del servidor */
  get player() {
    return this.client.manager.players.get(this.guild.id) || null;
  }

  /** Establece todos los valores a su estado original */
  setDefault() {
    this.textChannel = null;
    this.voiceChannel = null;
  }

  /**
   * Realiza la conexión al canal de voz del usuario
   * @param {String} text
   * @param {String} voice
   */
  connect(text, voice) {
    // Comprueba si existe un reproductor en el servidor
    if (this.player) return;

    // Crea el reproductor
    const player = this.client.manager.create({
      selfDeafen: true,
      textChannel: text,
      voiceChannel: voice,
      guild: this.guild.id,
    });

    // Comprueba si ya se ha conectado a un canal de voz
    if (player.state !== 'CONNECTED') player.connect();
  }

  /**
   * Realiza la busqueda a través de Lavalink
   * @param {String} query
   * @param {Object} author
   */
  async searchSong(query, author) {
    let res;
    const player = this.player;
    const search = query.join(' ');

    try {
      // Busca canciones mediante una consulta o URL
      res = await player.search(search, author);
      // Comprueba si la busqueda ha fallado y elimina el reproductor
      if (res.loadType === 'LOAD_FAILED') {
        if (!player.queue.current) player.destroy();
        throw res.exception;
      }
    } catch (error) {
      throw error;
    }

    return res;
  }

  /**
   * Reproduce las canciones agregadas a la cola
   * @param {Object} result
   * @return {Promise}
   */
  playRequested(result) {
    return new Promise((resolve) => {
      const player = this.player;

      switch (result.loadType) {
        // Ejecuta cuando no ha encontrado resultados con los terminos introducidos
        case 'NO_MATCHES':
          if (!player.queue.current) player.destroy();

          return resolve('NO_MATCHES');
        // Ejecuta cuando ha encontado resultados (url, consulta)
        case 'TRACK_LOADED':
        case 'SEARCH_RESULT':
          player.queue.add(result.tracks[0]);

          if (!player.playing && !player.paused && !player.queue.size)
            player.play();

          return resolve('TRACK_LOADED');
        // Ejecuta cuando se ha cargado la playlist introducida
        case 'PLAYLIST_LOADED':
          player.queue.add(result.tracks);

          if (
            !player.playing &&
            !player.paused &&
            player.queue.totalSize === result.tracks.length
          )
            player.play();

          return resolve('PLAYLIST_LOADED');
      }
    });
  }
};
