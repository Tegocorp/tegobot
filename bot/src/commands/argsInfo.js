module.exports = {
  name: 'args-info',
  guildOnly: true,
  aliases: ['args', 'ainfo'],
  permissions: 'ADMINISTRATOR',
  description: 'Muestra información sobre los argumentos entregados.',
  execute(msg, args) {
    msg.channel.send(
      `Argumentos: ${args}\nNúmero de argumentos: ${args.length}`
    );
  },
};
