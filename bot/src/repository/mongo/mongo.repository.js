const mongoose = require('mongoose');
const guildCollection = require('./collections/guild.collection');

// Mantiene la conexión con el repositorio
let db = null;

/**
 * Abre la conexión a la base de datos y la guarda en la variable 'db'
 * @return {Promise} Será resuelta cuando se conecte satisfactoriamente
 */
const connect = async () =>
  (db = await mongoose.connect('mongodb://localhost:27017/tegobot', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }));

connect()
  .then(() => {
    guildCollection.setDatabase(db);
    console.log('Conectado a la base de datos correctamente');
  })
  .catch((error) =>
    console.log(
      `Ha ocurrido un error conectado a la base de datos: ${error.message}`
    )
  );

module.exports = {
  ...guildCollection.queries,
};
