'use strict';

import User from './user.model';
import config from '../../config/environment';
import request from 'request';


/**
 * Get user data from the Kanban API
 */
function getUser(username, callback) {
  var target = `${config.api}/user/${username}`;
  return request.get({url: target, json: true}, (err, response, body) => {
    if(err) return callback(err);
    if(response.statusCode == 404) {
      var error = new Error('Sorry, no access for you');
      error.status(401);
      return callback(error);
    }
    callback(null, body);
  });
}

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
    return res.status(403).json({message: 'Your new password cannot be empty'});
  } else {
    return User.findById(userId, user => {
      if(user.authenticate(oldPass)) {
        user.password = newPass;
        return user.save()
          .then(() => {
            res.status(204).end();
          });
      } else {
        return res.status(403).json({message: 'Wrong password'});
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
