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
      const manager = client.manager;
      const player = manager.get(guildId);
      const userData = members.cache.get(user.id);

      try {
        await reaction.users.remove(user.id);

        switch (emoji) {
          case '⏹':
            const stopCommand = commands.get('stop');

            // Realiza la ejecución del comando
            return stopCommand.executeReaction(userData, player, manager);
          case '⏯️':
            const pPauseCommand = commands.get('ppause');

            // Realiza la ejecución del comando
            return pPauseCommand.executeReaction(userData, player);
          case '⏭️':
            const skipCommand = commands.get('skip');

            // Realiza la ejecución del comando
            return skipCommand.executeReaction(userData, player);
          case '🔀':
            const shuffleCommand = commands.get('shuffle');

            // Realiza la ejecución del comando
            return shuffleCommand.executeReaction(userData, player);
        }
      } catch (error) {
        console.error(
          `Ha ocurrido un error tratando de ejecutar la reacción (${emoji} ): ${error.message}`
        );
      }
    }
  },
};
