import passport from 'passport';
import {Strategy} from 'passport-local';

function authenticate(User, username, password, callback) {
  User.findOne({username: username.toLowerCase()}, (err, user) => {
    if(err) return callback(err);
    if(!user) return callback(null, false, {message: 'Wrong username'});
    user.authenticate(password, (authErr, valid) => {
      if(authErr) return callback(authErr);
      if(!valid) return callback(null, false, {message: 'Wrong password'});
      else return callback(null, user);
    });
  });
}

export function setup(User) {
  passport.use(new Strategy({}, function(username, password, callback) {
    return authenticate(User, username, password, callback);
  }));
}
