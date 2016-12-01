module.exports = function(app, passport) {

  app.get('/', function(req, res) {
    res.render('index.ejs');
  });

  app.get('/login', function(req,res) {
    res.render('login.ejs');
  });

  app.get('/signup', function(req,res) {
    res.render('signup.ejs', {messages: req.flash('signupMessage')});
  });

  app.get('/dashboard', UserLoggedIn, function(req,res) {
    res.render('dashboard.ejs', {
      //to get user out of the session and pass to template
      user: req.user
    });
  });

  app.get('/logout', function(req,res) {
    req.logout();
    res.redirect('/');
  });

};

function UserLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect('/');
}
