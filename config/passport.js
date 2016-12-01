//referred from passportjs documentation http://passportjs.org/docs/overview, https://github.com/jaredhanson/passport-twitter and https://github.com/scotch-io/easy-node-authentication/tree/twitter

var TwitterStrategy  = require('passport-twitter').Strategy;

//for loading user
var User = require('../app/models/user');

//for loading authentication variables
var configAuth = require('./auth');

module.exports = function(passport) {

    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });

    passport.use(new TwitterStrategy({

        consumerKey : configAuth.twitterAuth.consumerKey,
        consumerSecret : configAuth.twitterAuth.consumerSecret,
        callbackURL : configAuth.twitterAuth.callbackURL,
        passReqToCallback : true // checks if a user is logged in or not

    },
    function(req, token, tokenSecret, profile, done) {

        process.nextTick(function() {
            if (!req.user) {
                User.findOne({ 'twitter.id' : profile.id }, function(err, user) {
                    if (err)
                        return done(err);
                    if (user) {
                        if (!user.twitter.token) {
                            user.twitter.token = token;
                            user.twitter.username = profile.username;
                            user.twitter.displayName = profile.displayName;
                            user.save(function(err) {
                                if (err)
                                    return done(err);

                                return done(null, user);
                            });
                        }
                        return done(null, user); // user found, return that user
                    } else {
                        var newUser  = new User();
                        newUser.twitter.id  = profile.id;
                        newUser.twitter.token = token;
                        newUser.twitter.username = profile.username;
                        newUser.twitter.displayName = profile.displayName;
                        newUser.save(function(err) {
                            if (err)
                                return done(err);

                            return done(null, newUser);
                        });
                    }
                });

            } else {
                var user = req.user;
                user.twitter.id  = profile.id;
                user.twitter.token = token;
                user.twitter.username = profile.username;
                user.twitter.displayName = profile.displayName;

                user.save(function(err) {
                    if (err)
                        return done(err);

                    return done(null, user);
                });
            }

        });

    }));

};
