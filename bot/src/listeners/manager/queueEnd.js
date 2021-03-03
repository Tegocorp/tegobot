const { playerEmbeds } = require('../../utils/embeds');
const Music = require('../../repository/mongo/models/Music');

module.exports = {
  name: 'queueEnd',
  async execute(client, player) {
    const guild = client.guilds.cache.get(player.guild);

    const { id, music } = guild;

    const musicFilter = { guildId: id };
    const musicUpdate = { $unset: { queue: '' } };

    // Elimina la array queue de la db
    await Music.updateOne(musicFilter, musicUpdate);

    // Mensaje de gestión
    const playerMessage = music.playerMessage;

    player.destroy();

    const playerEmbed = playerEmbeds.player();

    // Edita el mensaje del reproductor
    return playerMessage.edit(playerEmbed);
  },
};
