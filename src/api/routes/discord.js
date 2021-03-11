// eslint-disable-next-line new-cap
const router = require('express').Router();

router.get('/discord', (req, res) => {
  res.sendStatus(200);
});

module.exports = router;
