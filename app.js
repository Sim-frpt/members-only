const createError = require('http-errors');
const express = require('express');
const debug = require('debug')('members-only:server');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

const indexRouter = require('./routes/index');
const User = require('./models/user');

require('dotenv').config()

const app = express();

// DB connection
mongoose.connect( process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  }
);

const db = mongoose.connection;

db.on('error', debug.bind(console, 'connection error'));
db.once('open', debug.bind(console, 'connected to db'));

// Passport init
passport.use(new LocalStrategy( { usernameField: 'email' },
  function (email, password, done) {

    const query = User.findOne({ email: email });

    query.exec( function (err, user) {
      if (err) {
        return done(err);
      }

      if (!user) {
        return done(null, false, { message: 'Incorrect username' });
      }

      bcrypt.compare(password, user.password, function (err, result) {

        if (err) {
          return done(err);
        }

        if (result) {
          return done(null, user);
        }

        return done(null, false, { msg: 'incorrect password' });
      });
    });
  }
));

passport.serializeUser(function (user, done) {
  debug(user);
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  User.findById(id)
    .populate('status')
    .exec((err, user) => {
      done(err, user);
    });
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
