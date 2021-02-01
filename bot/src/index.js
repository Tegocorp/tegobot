const Reproductor = require('./Reproductor');
const { prefijo, token } = require('./config');

// const fs = require('fs');
const Discord = require('discord.js');

const cliente = new Discord.Client();
cliente.reproductor = new Reproductor();
cliente.comandos = new Discord.Collection();

const iniciarComandos = () => {
  const archivosComandos = fs
    .readdirSync('./comandos')
    .filter((file) => file.endsWith('.js'));
  for (const archivo of archivosComandos) {
    const comando = require(`./comandos/${archivo}`);
    cliente.comandos.set(comando.nombre, comando);
  }
};

cliente.on('ready', () => {
  iniciarComandos();
  cliente.reproductor.iniciarLavalink();
  cliente.reproductor.establecerIdCliente(cliente.user.id);

  console.log(
    `Tegobot se ha iniciado correctamente -> ${cliente.user.username}`
  );
});

cliente.on('message', (msg) => {
  if (!msg.content.startsWith(prefijo) || msg.author.bot) return;
});

cliente.reproductor.lavalink.on('error', (err, node) => {
  console.log(
    `Ha ocurrido el siguiente error -> ${err.message}, en el nodo ${node}`
  );
});

cliente.login(token);
