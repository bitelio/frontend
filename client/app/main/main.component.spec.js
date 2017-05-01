'use strict';

import main from './main.component';
import {MainController} from './main.component';

describe('Component: MainComponent', function() {
  beforeEach(angular.mock.module(main));
  beforeEach(angular.mock.module('stateMock'));

  it('should do nothing', function() {
    expect([].length)
      .to.equal(0);
  });
});
