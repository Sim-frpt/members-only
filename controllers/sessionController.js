const passport = require('passport');
const createError = require('http-errors');

exports.authenticate = (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {

    if (err) {
      return next(err);
    }

    if (!user) {
      return res.render('log-in', {
        title: "Log In",
        message: info.message,
        field: info.field
      });
    }

    req.login(user, (err) => {

      if (err) {
        return next(err);
      }

      return res.redirect('/');
    });
  })(req, res, next);
};

exports.verifyLogInStatus = (req, res, next)  => {
  if (!req.user) {
    return next(createError(401, 'Please log in to view this page.'));
  }

  next();
};
