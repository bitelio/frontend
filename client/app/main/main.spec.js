'use strict';

import main from './index';
import {MainController} from './index';

describe('Main', function() {
  beforeEach(angular.mock.module(main));
  beforeEach(angular.mock.module('stateMock'));

  it('should do nothing', function() {
    expect([].length)
      .to.equal(0);
  });
});
