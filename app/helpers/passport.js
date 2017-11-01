const passport = require('passport');
const mongoose = require('mongoose');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const config = require('../config/config');

const User = mongoose.model('users');

passport.use(

  new GoogleStrategy({
    clientID: config.googleClientID,
    clientSecret: config.googleClientSecret,
    callbackURL: '/auth/google/callback',
    proxy: true
  }, (accessToken, refreshToken, profile, done) => {

    User.findOne({
      googleUserId: profile.id
    }).then((existingUser) => {
      if (existingUser) {
        done(null, existingUser);
      } else {
        new User({
            googleUserId: profile.id,
            googleUserToken: 'accessToken',
            googleUserFullname: profile.displayName,
            googleUserEmail: profile.emails[0].value
          })
          .save()
          .then(newUser => done(null, newUser));
      }
    });


  })
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});


passport.deserializeUser((id, done) => {

  User.findById(id).then((user) => {
    if (user) {
      done(null, user);
    } else {

    }
  });
});
