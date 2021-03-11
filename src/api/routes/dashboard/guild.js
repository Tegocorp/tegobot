// eslint-disable-next-line new-cap
const router = require('express').Router();

let client = null;

exports.setClient = (_client) => {
  client = _client;
};

router.get('/:id', (req, res) => {
  const guildID = req.params.id;
  const guildData = client.guilds.cache.get(guildID);

  res.send(guildData);
});

router.get('/queue/:id', (req, res) => {
  const guildID = req.params.id;
  const player = client.manager.get(guildID);

  res.send(player.queue);
});

exports.router = router;
