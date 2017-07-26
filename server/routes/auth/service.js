'use strict';
import jwt from 'jsonwebtoken';
import expressJwt from 'express-jwt';
import compose from 'composable-middleware';
import User from '../user/model';
import env from 'config/environment';

var validateJwt = expressJwt({
  secret: env.secret
});

/**
 * Attaches the user object to the request if authenticated
 * Otherwise returns 403
 */
export function isAuthenticated() {
  return compose()
    // Validate jwt
    .use(function(req, res, next) {
      // allow access_token to be passed through query parameter as well
      if(req.query && req.query.hasOwnProperty('access_token')) {
        req.headers.authorization = `Bearer ${req.query.access_token}`;
      }
      // IE11 forgets to set Authorization header sometimes. Pull from cookie instead.
      if(req.query && typeof req.headers.authorization === 'undefined') {
        req.headers.authorization = `Bearer ${req.cookies.token}`;
      }
      validateJwt(req, res, next);
    })
    // Attach user to request
    .use(function(req, res, next) {
      User.findById(req.user._id).exec()
        .then(user => {
          if(!user) return res.status(401).end();
          req.user = user;
          next();
        })
        .catch(err => next(err));
    });
}

/**
 * Returns a jwt token signed by the app secret
 */
export function signToken(_id) {
  return jwt.sign({ _id}, env.secret, {
    expiresIn: 60 * 60 * 5
  });
}
