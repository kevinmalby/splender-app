'use strict';

const mongoose = require('mongoose'),
  regexes = require('../../regex/regexes'),
  bcrypt = require('bcrypt'),
  Schema = mongoose.Schema,
  SALT_WORK_FACTOR = 10;

let StatsSchema = new Schema({
  twoPlayerWins: Number,
  twoPlayerLosses: Number,
  totalTwoPlayerPlays: Number,
  threePlayerWins: Number,
  threePlayerLosses: Number,
  totalThreePlayerPlays: Number,
  fourPlayerWins: Number,
  fourPlayerLosses: Number,
  totalFourPlayerPlays: Number,
  gamesLeftEarly: Number,
  totalNoblesReceived: Number
});

StatsSchema.virtual('totalWins').get(function() {
  return this.totalTwoPlayerWins +
    this.totalThreePlayerWins +
    this.totalFourPlayerWins;
});

StatsSchema.virtual('totalLosses').get(function() {
  return this.totalTwoPlayerLosses +
    this.totalThreePlayerLosses +
    this.totalFourPlayerLosses;
});

StatsSchema.virtual('totalPlays').get(function() {
  return this.totalTwoPlayerPlays +
    this.totalThreePlayerPlays +
    this.totalFourPlayerPlays;
});


let UserSchema = new Schema({
  username: {
    type: String,
    trim: true,
    unique: true,
    required: true
  },
  email: {
    type: String,
    validate: [
      function(email) {
        return regexes.email.test(email);
      }, 'Not a valid email address'
    ]
  },
  password: {
    type: String,
    validate: [
      function(password) {
        return password && password.length >= 7;
      }, 'Password should be at least 7 characters'
    ]
  },
  stats: [StatsSchema]
});

UserSchema.pre('save', function(next) {
    let user = this;

    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) {
      return next();
    }

    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) {
          return next(err);
        }

        // hash the password using our new salt
        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) {
              return next(err);
            }

            // override the cleartext password with the hashed one
            user.password = hash;
            next();
        });
    });
});

UserSchema.methods.verifyPassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

UserSchema.statics.findByUsername = function (username) {
  return new Promise((resolve, reject) => {
    this.find({ username: new RegExp(username, 'i') })
      .then(user => resolve(user))
      .catch(err => reject(err))
  });
}

mongoose.model('User', UserSchema);