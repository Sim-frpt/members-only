const passport = require('passport');

exports.authenticate = (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {

    if (err) {
      return next(err);
    }

    if (!user) {
      return res.render('log-in', {
        title: "Log In",
        message: info.message
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
