const passport = require('passport');
const DiscordStrategy = require('passport-discord');

const { api: config } = require('../../config');
const User = require('../../repository/mongo/models/User');

passport.serializeUser((user, done) => done(null, user.userId));

passport.deserializeUser(async (userId, done) => {
  const user = await User.findOne({ userId });

  return user ? done(null, user) : done(null, null);
});

passport.use(
  new DiscordStrategy(
    {
      clientID: config.clientID,
      clientSecret: config.clientSecret,
      callbackURL: config.callback,
      scope: ['identify', 'guilds'],
    },
    async (accessToken, refreshToken, profile, done) => {
      const { id, username, discriminator, avatar, guilds } = profile;

      const userData = await User.findOneAndUpdate(
        { userId: id },
        {
          discordTag: `${username}#${discriminator}`,
          avatar,
          guilds,
        },
        { new: true }
      );

      if (userData) return done(null, userData);
      else {
        const newUser = await User.create({
          userId: id,
          discordTag: `${username}#${discriminator}`,
          avatar,
          guilds,
        });

        return done(null, newUser);
      }
    }
  )
);
