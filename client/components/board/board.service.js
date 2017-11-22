'use strict';


export function BoardService() {
  'ngInject';

  var Board = {
    initialize(data) {
      console.log(data);
    }
  };

  return Board;
}
