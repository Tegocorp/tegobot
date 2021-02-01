const { nodos } = require('./config');
const { Manager } = require('lavacord');

/** Clase que utilizará el bot para iniciar Lavalink y manejar la música */
class Reproductor {
  /**
   * Constructor de la clase Reproductor
   * @param {string} idCliente
   */
  constructor(idCliente) {
    this.lavalink;
    this.nodos = nodos;
    this.contadorShards = 1;
    this.idCliente = idCliente;
  }

  /**
   * Método que establece el ID del cliente en el constructor
   * @param {*} id
   */
  establecerIdCliente(id) {
    this.idCliente = id;
  }

  /** Método que inicia la conexión con el servidor de Lavalink */
  async iniciarLavalink() {
    this.lavalink = new Manager(this.nodos, {
      user: this.idCliente,
      shards: this.contadorShards,
    });

    await this.lavalink
      .connect()
      .then((res) => {
        if (res) return true;
      })
      .catch((err) => err);
  }
}

module.exports = Reproductor;
