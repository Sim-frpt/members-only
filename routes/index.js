const express = require('express');
const router = express.Router();

// Controllers
const indexController = require('../controllers/indexController');
const sessionController = require('../controllers/sessionController');

// Validation
const signUpValidator = require('../services/sign-up-validator');
const messageValidator = require('../services/message-validator');

// Set currentUser variable to be the logged in user and make it accessible in all views
router.use((req, res, next) => {
  res.locals.currentUser = req.user;
  if (req.user) {
    res.locals.isBasic = req.user.status.name === 'basic' ? true : false;
    res.locals.isMember = req.user.status.name === 'member' ? true : false;
    res.locals.isAdmin = req.user.status.name === 'admin' ? true : false;
  }
  next();
});

// GET home page.
router.get('/', indexController.home);

// GET about page.
router.get('/about', indexController.getAbout);

// GET sign up form
router.get('/sign-up', indexController.getSignUp);

// POST sign up form
router.post('/sign-up', signUpValidator(), indexController.postSignUp);

// GET log in form
router.get('/log-in', indexController.getLogIn);

// POST log in form
router.post('/log-in', sessionController.authenticate);

// GET log out
router.get('/log-out', indexController.getLogOut);

// GET message form
router.get('/message', sessionController.verifyLogInStatus, indexController.getMessage);

// POST message form
router.post('/message', sessionController.verifyLogInStatus, messageValidator(), indexController.postMessage);

// POST delete message
router.post('/message/delete', sessionController.verifyLogInStatus,
  sessionController.verifyAdminPrivilege, indexController.postMessageDel);

// GET members form
router.get('/members', sessionController.verifyLogInStatus, indexController.getMembers);

// POST members form
router.post('/members', sessionController.verifyLogInStatus, indexController.postMembers);

// GET admin form
router.get('/admin', sessionController.verifyLogInStatus,
  sessionController.verifyMemberPrivilege, indexController.getAdmin);

// POST admin form
router.post('/admin', sessionController.verifyLogInStatus, indexController.postAdmin);

module.exports = router;
