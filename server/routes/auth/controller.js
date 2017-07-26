'use strict';

import {signToken} from './service';
import User from '../user/model';


export function authenticate(req, res, next) {
  if(!req.body.username) return res.status(403).json({message: 'Bad request'});
  var username = req.body.username.toLowerCase();
  User.findOne({username}, (err, user) => {
    if(err) return next(err);
    if(!user) return res.status(404).json({message: 'Wrong username'});
    user.authenticate(req.body.password, (authErr, valid) => {
      if(authErr) return next(authErr);
      if(!valid) return res.status(401).json({message: 'Wrong password'});
      res.json({token: signToken(user._id)});
    });
  });
}
