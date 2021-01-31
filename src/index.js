const { token } = require('./config');
const Discord = require('discord.js');

const cliente = new Discord.Client();

cliente.on('ready', () => {
  console.log(`tegobot iniciado correctamente -> ${cliente.user.tag}.`);
});

cliente.on('message', (msg) => {
  const mensaje = 'Le gusta el reggaetón de Héctor el Father.';
  if (msg.content === 'test') msg.reply(mensaje);
});

cliente.login(token);
