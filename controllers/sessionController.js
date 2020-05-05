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
    res.redirect('log-in');
  }
  next();
};

exports.verifyMemberPrivilege = (req, res, next) => {
  // easier than to check if it's 'member' or 'admin'
  if (req.user.status.name === 'basic') {
    return next(createError(403, "You don't have member privileges."));
  }
  next();
}

exports.verifyAdminPrivilege = (req, res, next) => {
  if (req.user.status.name !== 'admin') {
    return next(createError(403, "You don't have admin privileges."));
  }
  next();
}
