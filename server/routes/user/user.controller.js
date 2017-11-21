'use strict';

import User from './user.model';
import {getUser} from './user.service';
import {signToken} from '../auth/auth.service';
import env from 'config/environment';
import sgMail from '@sendgrid/mail';

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
  User.findOne({username}, (err, localUser) => {
    if(err) return next(err);
    getUser(req.body.email, (err, kanbanUser) => {
      if(err) return next(err);
      var user = localUser || new User({username: req.body.email});
      user.generateToken(err => {
        if(err) return next(err);
        const link = `http://${req.headers.host}/reset/${user.token}`;
        const action = localUser ? 'recover' : 'activate';
        sendEmail(action, link, kanbanUser);
        var name = kanbanUser.FullName.split(' ')[0];
        name = name.charAt(0).toUpperCase()
          + name.slice(1).toLowerCase();
        res.json({action, name});
      });
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

/**
 * Send welcome email
 */
function sendEmail(action, link, user) {
  if(env.sendgrid) {
    sgMail.setApiKey(env.sendgrid);
    var name = user.FullName.split(' ')[0];
    name = name.charAt(0).toUpperCase()
      + name.slice(1).toLowerCase();
    const msg = {
      to: user.UserName,
      from: 'Bitelio <info@bitelio.com>',
      substitutions: {name, link}
    };
    if(action === 'activate') {
      msg.templateId = '5077e279-b82e-46ea-8034-fdf41d103373';
    } else {
      msg.templateId = '95851851-5c66-4de4-b12a-8e4a81ccb966';
    }
    sgMail.send(msg);
  } else {
    console.log(link);
  }
}
