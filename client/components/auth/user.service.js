'use strict';

export function UserResource($resource) {
  'ngInject';

  return $resource('/api/user/:controller', {}, {
    changePassword: {
      method: 'PUT',
      params: {
        controller: 'password'
      }
    }
  });
}
