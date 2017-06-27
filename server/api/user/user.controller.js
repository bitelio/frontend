'use strict';

import User from './user.model';
import config from '../../config/environment';
import jwt from 'jsonwebtoken';
import request from 'request';

function validationError(res, statusCode) {
  statusCode = statusCode || 422;
  return function(err) {
    return res.status(statusCode).json(err);
  };
}

/**
 * Creates a new user
 */
export function create(req, res) {
  var newUser = new User(req.body);
  newUser.save()
    .then(function(user) {
      var token = jwt.sign({ _id: user._id }, config.secrets.session, {
        expiresIn: 60 * 60 * 5
      });
      res.json({token});
    })
    .catch(validationError(res));
}

/**
 * Get a single user
 */
export function show(req, res, next) {
  var userId = req.params.id;
  return User.findById(userId).exec()
    .then(user => {
      if(!user) return res.status(404).end();
      res.json(user.profile);
    })
    .catch(err => next(err));
}

/**
 * Get my info
 */
export function me(req, res, next) {
  return request.get({url: `${config.apiUrl}/user/${req.user.username}`, json: true}, (err, response, body) => {
    if(err) return next(err);
    if(response.statusCode == 404) return res.status(401).end();
    res.json(body);
  });
}

/**
 * Change a users password
 */
export function changePassword(req, res) {
  var userId = req.user._id;
  var oldPass = String(req.body.oldPassword);
  var newPass = String(req.body.newPassword);

  return User.findById(userId).exec()
    .then(user => {
      if(user.authenticate(oldPass)) {
        user.password = newPass;
        return user.save()
          .then(() => {
            res.status(204).end();
          })
          .catch(validationError(res));
      } else {
        return res.status(403).end();
      }
    });
}

/**
 * Authentication callback
 */
export function authCallback(req, res) {
  res.redirect('/');
}
