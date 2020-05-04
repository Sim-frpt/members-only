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
  useCreateIndex: true,
  useFindAndModify: false
});

const db = mongoose.connection;

db.on('error', debug.bind(console, 'connection error'));
db.once('open', debug.bind(console, 'connected to db'));

// Passport init
passport.use(new LocalStrategy( { usernameField: 'email' },
  async (email, password, done) => {

    try {
      const user = await User.findOne().byMail(email);

      if (!user) {
        return done(null, false, {
          message: 'Incorrect username',
          field: 'email'
        });
      }

      const isPasswordCorrect = await bcrypt.compare(password, user.password);

      if (!isPasswordCorrect) {
        return done(null, false, {
          message: 'Incorrect password',
          field: 'password'
        });
      }

      return done(null, user);
    } catch (err) {
      return done(err);
    }
  }
));

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  User.findById(id, '-password')
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
