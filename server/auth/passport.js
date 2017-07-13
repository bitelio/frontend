import passport from 'passport';
import {Strategy} from 'passport-local';

function authenticate(User, username, password, done) {
  User.findOne({username: username.toLowerCase()}, (err, user) => {
    if(err) return done(err);
    if(!user) return done(null, false, {message: 'Wrong username'});
    user.authenticate(password, (authErr, valid) => {
      if(authErr) return done(authErr);
      if(!valid) return done(null, false, {message: 'Wrong password'});
      else return done(null, user);
    });
  });
}

export function setup(User) {
  passport.use(new Strategy({}, function(username, password, done) {
    return authenticate(User, username, password, done);
  }));
}
