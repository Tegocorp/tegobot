// eslint-disable-next-line new-cap
const router = require('express').Router();

let client = null;

exports.setClient = (_client) => {
  client = _client;
};

router.get('/:id', (req, res) => {
  const userID = req.params.id;
  const userData = client.users.cache.get(userID);

  res.send(userData);
});

exports.router = router;
