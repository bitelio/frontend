'use strict';

/* globals describe, expect, it, before, beforeEach, afterEach */

import 'app';
import User from './user.model';
var user;

describe('User Model', function() {
  before(function() {
    return User.remove();
  });

  afterEach(function() {
    return User.remove();
  });

  it('should begin with no users', function() {
    return expect(User.find({}).exec()).to
      .eventually.have.length(0);
  });

  describe('given the user is registered', function() {
    beforeEach(function() {
      user = new User({
        username: 'test@example.com'
      });
      return user.save();
    });

    it('should not authenticate until activated', function() {
      expect(user.authenticate(undefined)).not.to.be.true;
      expect(user.authenticate('')).not.to.be.true;
    });
  });

  describe('given the user is active', function() {
    beforeEach(function() {
      user = new User({
        username: 'test@example.com',
        password: 'password'
      });
      return user.save();
    });

    it('should authenticate with a valid password', function() {
      expect(user.authenticate('password')).to.be.true;
    });

    it('should not authenticate with an invalid password', function() {
      expect(user.authenticate('blah')).to.not.be.true;
    });
  });
});
