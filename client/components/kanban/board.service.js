'use strict';

export function BoardService($resource) {
  'ngInject';

  return $resource('/api/board/:boardId/:controller', {
    boardId: '@boardId'
  }, {
    getLanes: {
      method: 'GET',
      params: {
        controller: 'lanes'
      }
    }
  });
}
