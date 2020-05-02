const express = require('express');
const router = express.Router();

// Controllers
const indexController = require('../controllers/indexController');
const sessionController = require('../controllers/sessionController');

// Validation
const signUpValidator = require('../services/sign-up-validator');

router.use((req, res, next) => {
  res.locals.currentUser = req.user;
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
router.get('/message', indexController.getMessage);

// POST message form
router.post('/message', indexController.postMessage);

// GET members form
router.get('/members', indexController.getMembers);

// POST members form
router.post('/members', indexController.postMembers);

// GET admin form
router.get('/admin', indexController.getAdmin);

// POST admin form
router.post('/admin', indexController.postAdmin);

module.exports = router;
