const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const UserDb = require("../db/UserDb");
const key = require("../config/keys");

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = key.secretOrKey;

module.exports = passport => {
  passport.use(
    new JwtStrategy(opts, (jwt_payload, done) => {
      UserDb.findByUserId(jwt_payload.id)
        .then(user => {
          if (user) {
            const tokUser = {
              ...user._doc,
              exp: jwt_payload.exp,
              iat: jwt_payload.iat
            };
            return done(null, tokUser);
          }
          return done(null, false);
        })
        .catch(err => console.log(err));
    })
  );
};
