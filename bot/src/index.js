const { token, lavapass } = require('./config');

const Discord = require('discord.js');
const { Manager } = require('lavacord');

const nodes = [
  {
    id: '1',
    host: 'localhost',
    port: 2333,
    password: lavapass,
  },
];

const cliente = new Discord.Client();

cliente.on('ready', async () => {
  cliente.reproductor = new Manager(nodes, {
    user: cliente.user.id,
    shards: 1,
  });
  await cliente.reproductor
    .connect()
    .then((res) => {
      if (res)
        console.log(`tegobot iniciado correctamente -> ${cliente.user.tag}.`);
    })
    .catch((err) =>
      console.error(
        `Ha ocurrido un error conectando con Lavalink -> ${err.message}`
      )
    );

  cliente.reproductor.on('error', (err, node) => {
    console.log(
      `Ha ocurrido el siguiente error -> ${err.message}, en el nodo ${node}`
    );
  });
});

cliente.login(token);
