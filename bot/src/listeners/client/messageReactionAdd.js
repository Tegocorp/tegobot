module.exports = {
  name: 'messageReactionAdd',
  async execute(client, reaction, user) {
    const { commands } = client;
    const { id: guildId, members, music } = reaction.message.channel.guild;

    await music.checkServerData();

    // Datos del servidor
    const musicData = music.serverData;
    // Canal donde se ha realizado la reacción
    const reactionChannelId = reaction.message.channel.id;

    // Emoji al que se ha reaccionado
    const emoji = reaction._emoji.name;

    if (reactionChannelId === musicData.player.textChannel) {
      const player = client.manager.get(guildId);
      const userData = members.cache.get(user.id);

      if (emoji === '⏭️') {
        const skipCommand = commands.get('skip');

        // Realiza la ejecución del comando
        return skipCommand.executeReaction(userData, player);
      }
    }
  },
};
