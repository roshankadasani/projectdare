module.exports = function(app, passport) {

  app.get('/', function(req, res) {
    res.render('index.ejs');
  });

  app.get('/watcher', function(req,res) {
    res.render('watcher.ejs')
  });

  app.get('/howto', function(req,res) {
    res.render('howto.ejs')
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

  app.get('/new', isLoggedIn, function(req, res) {
    res.render('new.ejs', { user: req.user });
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
