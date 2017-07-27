'use strict';

/* globals sinon, describe, expect, it, before, after */

import request from 'supertest';
import app from 'app';
import User from './user.model';
import * as userService from './user.service';


sinon.stub(userService, 'getUser', (username, callback) => {
  callback(null, {Id: 123123123});
});

describe('User Endpoint:', function() {
  var user;
  var token;

  before(function(done) {
    return User.remove().then(function() {
      user = new User({
        username: 'test@example.org',
        password: 'password'
      });

      return user.save().then(function() {
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
    });
  });

  after(function() {
    return User.remove();
  });

  describe('GET /api/user', function() {
    it('should respond with the user profile when authenticated', function(done) {
      request(app)
        .get('/api/user')
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
        .get('/api/user/me')
        .expect(401)
        .end(done);
    });
  });

  describe('PUT /api/user/password', function() {
    it('should not change the password if too short', function(done) {
      request(app)
        .put('/api/user/password')
        .set('authorization', `Bearer ${token}`)
        .send({oldPassword: 'password', newPassword: 'pass'})
        .expect(403)
        .end(done);
    });

    it('should change the password successfully', function(done) {
      request(app)
        .put('/api/user/password')
        .set('authorization', `Bearer ${token}`)
        .send({oldPassword: 'password', newPassword: 'wordpass'})
        .expect(200)
        .end(err => {
          if(err) throw err;
          request(app)
            .post('/api/auth')
            .send({
              username: 'test@example.org',
              password: 'password'
            })
            .expect(401)
            .end(done);
        });
    });
  });
});
