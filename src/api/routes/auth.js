const passport = require('passport');
// eslint-disable-next-line new-cap
const router = require('express').Router();

router.get('/', (req, res) => {
  if (req.user) res.sendStatus(200);
  else res.sendStatus(401).send({ msg: 'Unauthorized' });
});

router.get('/discord', passport.authenticate('discord'));

router.get(
  '/discord/redirect',
  passport.authenticate('discord'),
  (req, res) => {
    res.redirect('http://localhost:8081/dashboard');
  }
);

module.exports = router;
