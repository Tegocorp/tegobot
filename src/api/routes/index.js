// eslint-disable-next-line new-cap
const router = require('express').Router();

const auth = require('./auth');
const discord = require('./discord');

// Rutas que necesitan cliente
const { router: userRoutes } = require('./dashboard/user');
const { router: guildRoutes } = require('./dashboard/guild');

router.use('/auth', auth);
router.use('/discord', discord);

router.use('/user', userRoutes);
router.use('/guild', guildRoutes);

module.exports = router;
