const bcrypt = require('bcrypt');
const debug = require('debug')('members-only:indexController');

// Models
const User = require('../models/user');
const Message = require('../models/message');
const Privilege = require('../models/privilege');

const { validationResult } = require('express-validator');

// GET home page
exports.home =  async (req, res, next) => {
  const query = Message.find().sort('title').populate('author');

  try {
    const results = await query.exec();

    res.render('index', {
      title: 'Exclusive',
      template: 'index',
      messages: results
    });

  } catch (err) {
    return next(err);
  }
};

// GET about page
exports.getAbout = (req, res, next) => {
  res.send(`not implemented yet: ${req.method} ${req.path}`);
};

// GET sign up form
exports.getSignUp = (req, res, next) => {
  res.render('sign-up', { title: "Sign Up"});
};

// POST sign up form
exports.postSignUp = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    // Create an object that will contain each field of the form, with value
    // and error message
    const data = {};
    for (let property in req.body) {
      data[property] = {
        value: req.body[property]
      };
    };

    // pass the error message to the data object
    errors.array().forEach(error => {
      data[error.param].errorMsg = error.msg;
    });

    const { firstName, lastName, email, password, passwordConf } = data;

    return res.render('sign-up', {
      title: "Sign Up",
      firstName,
      lastName,
      email,
      password,
      passwordConf
    });
  }

  const query = Privilege.findOne({ name: 'basic' });

  const getBasicPrivilege = query.exec();
  const getHashedPassword = bcrypt.hash(req.body.password, 10);

  Promise.all([ getBasicPrivilege, getHashedPassword ])
    .then(results => {
      const status = results[0];
      const password = results[1];

      const user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password,
        status
      });

      return user.save();
    })
    .then(() => res.redirect('/log-in'))
    .catch( err => next(err));
};

// GET log in form
exports.getLogIn = (req, res, next) => {
  res.render('log-in', {
    title: "Log In"
  });
};

// GET log out form
exports.getLogOut = (req, res, next) => {
  req.logout();
  res.redirect('/');
};

// GET message form
exports.getMessage = (req, res, next) => {
  res.render('message-form', {
    title: 'New Message'
  });
};

// POST message form
exports.postMessage = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    // Create an object that will contain each field of the form, with value
    // and error message
    const data = {};
    for (let property in req.body) {
      data[property] = {
        value: req.body[property]
      };
    };

    // pass the error message to the data object
    errors.array().forEach(error => {
      data[error.param].errorMsg = error.msg;
    });

    const { title: messageTitle, text } = data;

    return res.render('message-form', {
      title: "New Message",
      messageTitle,
      text
    });
  }

  const message = new Message({
    title: req.body.title,
    text: req.body.text,
    author: req.user
  });

  message.save()
    .then(() => res.redirect('/'))
    .catch(err => next(err));
};

// GET members form
exports.getMembers = (req, res, next) => {
  res.render('members-form', {
    title: 'Become a Member'
  });
};

// POST members form
exports.postMembers = (req, res, next) => {
  if (req.body.password !== process.env.MEMBERS_PWD) {
    res.render('members-form', {
      title: 'Become a Member',
      message: "That's not our password. Have you even been invited?"
    });
  }

  const getPrivilege = Privilege.findOne({ name: 'member' });

  getPrivilege
    .then(status => {
      return User.findByIdAndUpdate( req.user._id, { status: status }, { new: true });
    })
    .then(() => res.redirect('/'))
    .catch(err => next(err));
};

exports.getAdmin = (req, res, next) => {
  res.send(`not implemented yet: ${req.method} ${req.path}`);
};

exports.postAdmin = (req, res, next) => {
  res.send(`not implemented yet: ${req.method} ${req.path}`);
};
