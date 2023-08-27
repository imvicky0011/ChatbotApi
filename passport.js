let JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;

// load up the user model
const {models: {User, Chatbot, Enduser, Conversation} } = require("../models")
const config = "secretcode"

module.exports = function(passport) {
  var opts = {};
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme("jwt");
  opts.secretOrKey = config;
  passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
    User.findbyPk({    
        id: jwt_payload.id
    }, 
        
        function(err, user) {
          if (err) {
              return done(err, false);
          }
          if (user) {
              done(null, user);
          } else {
              done(null, false);
          }
      });
  }));
};