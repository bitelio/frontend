'use strict';

export function UserResource($resource) {
  'ngInject';

  return $resource('/api/users/:controller', {}, {
    changePassword: {
      method: 'PUT',
      params: {
        controller: 'password'
      }
    },
    get: {
      method: 'GET',
      params: {
        controller: 'me'
      }
    }
  });
}
