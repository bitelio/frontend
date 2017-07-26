'use strict';
/*eslint no-invalid-this:0*/
import crypto from 'crypto';
mongoose.Promise = require('bluebird');
import mongoose, {Schema} from 'mongoose';

var UserSchema = new Schema({
  username: {type: String, lowercase: true, required: true},
  password: {type: String, minlength: 6},
  token: String,
  salt: String
});

/**
 * Pre-save hook
 */
UserSchema
  .pre('save', function(next) {
    // Handle new/update passwords
    if(!this.password || !this.isModified('password')) {
      return next();
    }

    // Make salt with a callback
    this.makeSalt((saltErr, salt) => {
      if(saltErr) return next(saltErr);
      this.salt = salt;
      this.encryptPassword(this.password, (encryptErr, hash) => {
        if(encryptErr) return next(encryptErr);
        this.password = hash;
        return next();
      });
    });
  });

/**
 * Methods
 */
UserSchema.methods = {
  /**
   * Authenticate - check if the passwords are the same
   *
   * @param {String} password
   * @param {Function} callback
   * @return {Boolean}
   * @api public
   */
  authenticate(password, callback) {
    if(!callback) return !!this.password && this.password === this.encryptPassword(password);
    if(!password) return callback(null, false);
    this.encryptPassword(password, (err, hash) => {
      if(err) return callback(err);
      if(this.password === hash) return callback(null, true);
      else return callback(null, false);
    });
  },

  /**
   * Make salt
   *
   * @param {Number} [byteSize] - Optional salt byte size, default to 16
   * @param {Function} callback
   * @return {String}
   * @api public
   */
  makeSalt(...args) {
    let byteSize;
    let callback;
    let defaultByteSize = 16;

    if(typeof args[0] === 'function') {
      callback = args[0];
      byteSize = defaultByteSize;
    } else if(typeof args[1] === 'function') {
      callback = args[1];
    } else {
      throw new Error('Missing Callback');
    }

    if(!byteSize) {
      byteSize = defaultByteSize;
    }

    return crypto.randomBytes(byteSize, (err, salt) => {
      if(err) return callback(err);
      else return callback(null, salt.toString('base64'));
    });
  },

  /**
   * Encrypt password
   *
   * @param {String} password
   * @param {Function} callback
   * @return {String}
   * @api public
   */
  encryptPassword(password, callback) {
    if(!password || !this.salt) {
      if(!callback) return null;
      else return callback(new Error('Missing password or salt'));
    }

    var defaultIterations = 10000;
    var defaultKeyLength = 64;
    var salt = new Buffer(this.salt, 'base64');

    if(!callback) {
      // eslint-disable-next-line no-sync
      return crypto.pbkdf2Sync(password, salt, defaultIterations, defaultKeyLength, 'sha1')
        .toString('base64');
    }

    return crypto.pbkdf2(password, salt, defaultIterations, defaultKeyLength,
      'sha1', (err, key) => {
        if(err) return callback(err);
        else return callback(null, key.toString('base64'));
      });
  },

  /**
   * Generate and store token for password reset
   */
  generateToken(callback) {
    var validity = 60 * 60; // seconds
    var date = Date.now();
    var deadline = date / 1000 + validity;
    var timestamp = deadline.toString(16).split('.')[0];
    var bytes = crypto.randomBytes(4).toString('hex');
    this.token = bytes + timestamp;
    this.save(err => callback(err));
  }
};

export default mongoose.model('User', UserSchema);
