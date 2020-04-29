const User = require('../models/user');
const Message = require('../models/message');

exports.home = (req, res, next) => {
  res.render('index', {
    title: 'Members-only'
  });
};

exports.getSignUp = (req, res, next) => {
  res.send(`not implemented yet: ${req.method} ${req.path}`);
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
