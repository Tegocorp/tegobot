module.exports = {
  name: 'args-info',
  description: 'Muestra información sobre los argumentos entregados.',
  args: true,
  cooldown: 5,
  guildOnly: true,
  usage: '<user> <role>',
  aliases: ['args', 'ainfo'],
  permissions: 'ADMINISTRATOR',
  execute(msg, args) {
    msg.channel.send(
      `Argumentos: ${args}\nNúmero de argumentos: ${args.length}`
    );
  },
};
