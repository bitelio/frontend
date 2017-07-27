'use strict';

import request from 'request';
import env from 'config/environment';


/**
 * Get user data from the Kanban API
 */
export function getUser(username, callback) {
  var target = `${env.api}/user/${username}`;
  return request.get({url: target, json: true}, (err, response, body) => {
    if(err) return callback(err);
    if(response.statusCode == 404) {
      var error = new Error('Sorry, no access for you');
      error.status = 401;
      return callback(error);
    }
    callback(null, body);
  });
}

