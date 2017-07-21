'use strict';

/* globals sinon, describe, expect, it, before, after */

import request from 'supertest';
import app from 'app';
import User from 'models/user';
import * as userService from 'services/user';


sinon.stub(userService, 'getUser', (username, callback) => {
  callback(null, {Id: 123123123});
});

describe('User endpoint:', function() {
  var user;

  before(function(done) {
    return User.remove().then(function() {
      user = new User({
        username: 'test@example.org',
        password: 'password'
      });

      return user.save(done);
    });
  });

  after(function(done) {
    return User.remove(done);
  });

  describe('GET /api/users/me', function() {
    var token;

    before(function(done) {
      request(app)
        .post('/api/auth')
        .send({
          username: 'test@example.org',
          password: 'password'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) throw err;
          token = res.body.token;
          done();
        });
    });

    it('should respond with the user profile when authenticated', function(done) {
      request(app)
        .get('/api/users/me')
        .set('authorization', `Bearer ${token}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) throw err;
          expect(res.body._id.toString()).to.equal(user._id.toString());
          done();
        });
    });

    it('should respond with a 401 when not authenticated', function(done) {
      request(app)
        .get('/api/users/me')
        .expect(401)
        .end(done);
    });
  });
});
