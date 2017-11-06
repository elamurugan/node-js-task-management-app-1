const GoogleStrategy = require('passport-google-oauth20').Strategy;
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');

// const passport = require('passport');
// const mongoose = require('mongoose');
// const User = mongoose.model('users');
// const config = require('../config/config');

module.exports = (passport, config, User) => {
    passport.use(new GoogleStrategy({
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

                const newUser = {
                    google_id: profile.id,
                    name: profile.displayName,
                    email: profile.emails[0].value,
                };
                new User(newUser)
                    .save()
                    .then(user => done(null, user));
            }
        });
    }));

    passport.use(new LocalStrategy({
        usernameField: 'email'
    }, (email, password, done) => {
        User.findOne({
            email: email
        }).then(user => {
            if (!user) {
                return done(null, false, { message: 'No User Found' });
            }
            console.log('user', user);
            console.log('password', password);
            bcrypt.compare(password, user.password, (err, isMatch) => {
                // if (err) throw err;
                console.log('err', err);
                console.log('isMatch', isMatch);
                if (isMatch) {
                    return done(null, user);
                } else {
                    return done(null, false, { message: 'Password Incorrect' });
                }
            })
        })
    }));

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
        console.log('Logged in User', id);
        User.findById(id).then((user) => {
            if (user) {
                done(null, user);
            } else {
                done(null, false);
            }
        });
    });
};