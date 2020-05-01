const passport = require('passport');

exports.authenticate = passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/log-in',
});

