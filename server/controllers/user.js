'use strict';

import User from 'models/user';
import {getUser} from 'services/user';


/**
 * Get user data
 */
export function me(req, res, next) {
  return getUser(req.user.username, (err, user) => {
    if(err) return next(err);
    user._id = req.user._id;
    res.json(user);
  });
}

/**
 * Change a users password
 */
export function changePassword(req, res) {
  var userId = req.user._id;
  var oldPass = String(req.body.oldPassword);
  var newPass = String(req.body.newPassword);

  if(!newPass) {
    return res.status(403)
      .json({message: 'Your new password cannot be empty'});
  } else {
    return User.findById(userId, user => {
      if(user.authenticate(oldPass)) {
        user.password = newPass;
        return user.save()
          .then(() => {
            res.status(204).end();
          });
      } else {
        return res.status(403)
          .json({message: 'Wrong password'});
      }
    });
  }
}

/**
 * Reset a users password
 */
export function resetPassword(req, res, next) {
  var username = req.body.email;
  return User.findOne({username}, user => {
    if(!user) {
      getUser(req.body.email, err => {
        if(err) return next(err);
        user = new User({username: req.body.email});
      });
    }
    user.generateToken(err => {
      if(err) return next(err);
      var link = `http://${req.headers.host}/signup/${user.token}`;
      console.log(link);
      res.json({message: 'Check your inbox!'});
    });
  });
}
