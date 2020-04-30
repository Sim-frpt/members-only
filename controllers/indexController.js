const User = require('../models/user');
const Message = require('../models/message');

exports.home =  async (req, res, next) => {
  const query = Message.find().sort('title').populate('author');

  try {
    const results = await query.exec();

    res.render('index', {
      title: 'Exclusive',
      template: 'index',
      messages: results
    });

  } catch(err) {
    return next(err);
  }
};

exports.getAbout = (req, res, next) => {
  res.send(`not implemented yet: ${req.method} ${req.path}`);
};

exports.getSignUp = (req, res, next) => {
  res.render('sign-up', { title: "Sign Up"});
};

exports.postSignUp = (req, res, next) => {
  res.send(`not implemented yet: ${req.method} ${req.path}`);
};

exports.getLogIn = (req, res, next) => {
  res.send(`not implemented yet: ${req.method} ${req.path}`);
};

exports.postLogIn = (req, res, next) => {
  res.send(`not implemented yet: ${req.method} ${req.path}`);
};


exports.getMessage = (req, res, next) => {
  res.send(`not implemented yet: ${req.method} ${req.path}`);
};

exports.postMessage = (req, res, next) => {
  res.send(`not implemented yet: ${req.method} ${req.path}`);
};

exports.getMembers = (req, res, next) => {
  res.send(`not implemented yet: ${req.method} ${req.path}`);
};

exports.postMembers = (req, res, next) => {
  res.send(`not implemented yet: ${req.method} ${req.path}`);
};

exports.getAdmin = (req, res, next) => {
  res.send(`not implemented yet: ${req.method} ${req.path}`);
};

exports.postAdmin = (req, res, next) => {
  res.send(`not implemented yet: ${req.method} ${req.path}`);
};
