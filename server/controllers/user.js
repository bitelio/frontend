'use strict';

import User from 'models/user';
import {signToken} from 'services/auth';
import {getUser} from 'services/user';


/**
 * Get user data
 */
export function profile(req, res, next) {
  return getUser(req.user.username, (err, user) => {
    if(err) return next(err);
    user._id = req.user._id;
    res.json(user);
  });
}

/**
 * Change password
 */
export function changePassword(req, res, next) {
  var userId = req.user._id;
  var {oldPass, newPass} = req.body;
  if(!newPass) return res.status(403).json({message: 'Missing new password'});
  User.findById(userId, (err, user) => {
    if(err) return next(err);
    if(!user) return res.status(404).json({message: 'User not found'});
    if(user.authenticate(oldPass)) {
      user.password = newPass;
      return user.save().then(() => {
        res.json({message: 'Password successfully changed'});
      });
    } else {
      return res.status(403).json({message: 'Wrong password'});
    }
  });
}

/**
 * Request password
 */
export function requestPassword(req, res, next) {
  var username = req.body.email;
  User.findOne({username}, (err, user) => {
    if(err) return next(err);
    if(!user) {
      getUser(req.body.email, err => {
        if(err) return next(err);
        user = new User({username: req.body.email});
      });
    }
    user.generateToken(err => {
      if(err) return next(err);
      var link = `http://${req.headers.host}/reset/${user.token}`;
      console.log(link);
      res.json({message: 'We\'ve sent you an email with an activation link'});
    });
  });
}

/**
 * Reset password
 */
export function resetPassword(req, res, next) {
  var {password, token} = req.body;
  var deadline = parseInt(token.slice(8), 16) * 1000;
  if(deadline < Date.now()) {
    return res.status(403).json({message: 'The link has expired'});
  }
  if(!token) return res.status(403).json({message: 'Missing token'});
  User.findOne({token: req.body.token}, (err, user) => {
    if(err) return next(err);
    if(!user) {
      return res.status(404).json({message: 'The link is not valid'});
    }
    user.password = password;
    user.token = null;
    user.save(err => {
      if(err) return next(err);
      res.json({token: signToken(user._id)});
    });
  });
}
