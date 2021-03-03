module.exports = {
  name: 'raw',
  async execute(client, packet) {
    if (
      ![
        'VOICE_STATE_UPDATE',
        'VOICE_SERVER_UPDATE',
        'MESSAGE_REACTION_ADD',
        'MESSAGE_REACTION_REMOVE',
      ].includes(packet.t)
    )
      return;

    if (packet.t === 'VOICE_STATE_UPDATE' || packet.t === 'VOICE_SERVER_UPDATE')
      client.manager.updateVoiceState(packet);

    if (
      packet.t === 'MESSAGE_REACTION_ADD' ||
      packet.t === 'MESSAGE_REACTION_REMOVE'
    ) {
      // Obtiene el canal donde se ha añadido la reacción
      const channel = client.channels.cache.get(packet.d.channel_id);

      // Comprueba si el mensaje de la reacción ya está en cache
      if (channel.messages.cache.has(packet.d.message_id)) return;

      channel.messages.fetch(packet.d.message_id).then((msg) => {
        const emoji = packet.d.emoji.id
          ? `${packet.d.emoji.name}:${packet.d.emoji.id}`
          : packet.d.emoji.name;

        const reaction = msg.reactions.cache.get(emoji);

        // Añade el usuario que ha reaccionado a la colección de usuarios
        if (reaction)
          reaction.users.cache.set(
            packet.d.user_id,
            client.users.cache.get(packet.d.user_id)
          );

        // Comprueba el tipo de paquete antes de emitir el evento
        if (packet.t === 'MESSAGE_REACTION_ADD')
          return client.emit(
            'messageReactionAdd',
            reaction,
            client.users.cache.get(packet.d.user_id)
          );

        if (packet.t === 'MESSAGE_REACTION_REMOVE')
          return client.emit(
            'messageReactionRemove',
            reaction,
            client.users.cache.get(packet.d.user_id)
          );
      });
    }
  },
};
