'use strict';

import request from 'request';
import env from 'config/environment';


/**
 * Get user data from the Kanban API
 */
export function getUser(username, callback) {
  var error;
  return request({
    url: `${env.api}/user`,
    method: 'post',
    json: true,
    body: {UserName: username}
  }, (err, response, body) => {
    if(err) return callback(err);
    if(response.statusCode != 200) {
      error = new Error(body);
      error.status = response.statusCode;
      return callback(error);
    }
    callback(null, body);
  });
}
