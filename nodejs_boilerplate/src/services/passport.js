const passport = require("passport");
const passportJWT = require("passport-jwt");
const JWTStrategy   = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;


//hardcoded users need to be removed while working with DB
var users = [
    {
      id: 1,
      name: 'jonathanmh',
      password: '%2yx4'
    },
    {
      id: 2,
      name: 'test',
      password: 'test'
    }
  ];

  var jwtOptions = {}
  jwtOptions.jwtFromRequest = ExtractJWT.fromAuthHeaderAsBearerToken();
  jwtOptions.secretOrKey = 'secret string';
  
  var strategy = new JWTStrategy(jwtOptions, function(jwt_payload, next) {
    console.log('payload received', jwt_payload);
    // usually this would be a database call:
    var user = users[_.findIndex(users, {id: jwt_payload.id})];
    if (user) {
      next(null, user);
    } else {
      next(null, false);
    }
  });
  
passport.use(strategy);

module.export = passport;