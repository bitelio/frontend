'use strict';

import User from './user.model';
import {getUser} from './user.service';
import {signToken} from '../auth/auth.service';


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
  var {oldPassword, newPassword} = req.body;
  if(!newPassword) return res.status(403).json({message: 'Missing new password'});
  return User.findById(userId, (err, user) => {
    if(err) return next(err);
    if(!user) return res.status(404).json({message: 'User not found'});
    if(user.authenticate(oldPassword)) {
      user.password = newPassword;
      return user.save(err => {
        if(err && err.name == 'ValidationError') return res.status(403).end();
        else if(err) return next(err);
        else return res.json({message: 'Password changed successfully'});
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
