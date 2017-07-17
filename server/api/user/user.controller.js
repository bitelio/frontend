'use strict';

import User from './user.model';
import config from '../../config/environment';
import request from 'request';


/**
 * Get user data from the Kanban API
 */
function getUser(username, res, callback) {
  var target = `${config.api}/user/${username}`;
  return request.get({url: target, json: true}, (err, response, body) => {
    if(err) {
      var message = err.code === 'ECONNREFUSED' ? 'API not reachable' : err.Error;
      return res.status(500).json({message});
    } else if(response.statusCode == 404) {
      return res.status(401).json({message: 'Sorry, no access for you'});
    } else {
      return callback(body);
    }
  });
}

/**
 * Get user data
 */
export function me(req, res) {
  return getUser(req.user.username, res, user => {
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
export function resetPassword(req, res) {
  return User.findOne({username: req.body.email}).exec()
    .then(user => {
      if(!user) {
        getUser(req.body.email, res, () => {
          user = new User({username: req.body.email});
          user.save();
        });
      }
      user.generateToken();
      var link = `http://${req.headers.host}/signup/${user.token}`;
      console.log(link);
    });
}

/**
 * Authentication callback
 */
export function authCallback(req, res) {
  res.redirect('/');
}
