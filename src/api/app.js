const cors = require('cors');
const express = require('express');
const passport = require('passport');
const { connection } = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

require('./strategies/discord');
const routes = require('./routes');

const app = express();
const appPort = process.env.apiPort || 3000;

app.use(
  session({
    secret: 'youshallnotpass',
    cookie: { maxAge: 60000 * 60 * 24 },
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: connection }),
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(cors({ origin: 'http://localhost:8081', credentials: true }));

app.use('/api', routes);

app.listen(appPort, () =>
  console.log(`Api funcionando en el puerto ${appPort}`)
);
