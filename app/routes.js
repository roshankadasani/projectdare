var dares = require('./models/dare.js');
var Twitter = require('twitter');
var credentials = require('../config/auth.js');

module.exports = function(app, passport) {

  var clientTweets = new Twitter({
    consumer_key: credentials.twitterAuth.consumerKey,
    consumer_secret: credentials.twitterAuth.consumerSecret,
    access_token_key: credentials.twitterAuth.accessToken,
    access_token_secret: credentials.twitterAuth.accessTokenSecret
  });

  app.get('/', function(req, res) {
    res.render('index.ejs');
  });

  app.get('/watcher', function(req,res) {
    res.render('watcher.ejs');
  });

  app.get('/watcher/tweets', function(req,res) {
    clientTweets.get('search/tweets', {q: '#projectdare473'}, function(error, tweets, response) {
      console.log(tweets.statuses);
      res.send(tweets);
    });
  });

  app.get('/howto', function(req,res) {
    res.render('howto.ejs');
  });

  app.get('/login', function(req,res) {
    res.render('login.ejs');
  });

  app.get('/auth/twitter', passport.authenticate('twitter', { scope : 'email' }));

  app.get('/auth/twitter/callback',
      passport.authenticate('twitter', {
          successRedirect : '/dashboard',
          failureRedirect : '/'
      }));

  app.get('/signup', function(req,res) {
    res.render('signup.ejs', {messages: req.flash('signupMessage')});
  });

  app.get('/connect/twitter', passport.authorize('twitter', { scope : 'email' }));

  app.get('/connect/twitter/callback',
      passport.authorize('twitter', {
          successRedirect : '/dashboard',
          failureRedirect : '/'
      }));

  app.get('/dashboard', isLoggedIn, function(req,res) {
    res.render('dashboard.ejs', {
      //to get user out of the session and pass to template
      user: req.user
    });
  });

  app.get('/dashboard/tweets', function(req, res) {
    var query = '#projectdare473 ' + req.query.hashtag;

    clientTweets.get('search/tweets', {q: query}, function(error, tweets, response) {
      if (error) { console.log(error); }
      else { res.json(tweets); }
    });
  });

  app.get('/dares', function(req, res) {
    dares.getAllDares(function(err, dareList) {
      if (err)
        console.log(err);
      else
        res.json(dareList);
    });
  });

  app.get('/new', isLoggedIn, function(req, res) {
    res.render('new.ejs', { user: req.user });
  });

  app.post('/new/savedare', function(req, res) {
    var username = req.user.twitter.username,
        title = req.body.title,
        description = req.body.description;

    dares.saveDare(username, title, description, function(result) {
      console.log(result);
      res.redirect('/dashboard');
    });
  });

  app.get('/logout', function(req,res) {
    req.logout();
    res.redirect('/');
  });

};

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated())
      return next();
  res.redirect('/');
}
