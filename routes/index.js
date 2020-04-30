const express = require('express');
const router = express.Router();

const indexController = require('../controllers/indexController');
const sessionController = require('../controllers/sessionController');

// GET home page.
router.get('/', indexController.home);

// GET about page.
router.get('/about', indexController.getAbout);

// GET sign up form
router.get('/sign-up', indexController.getSignUp);

// POST sign up form
router.post('/sign-up', indexController.postSignUp);

// GET log in form
router.get('/log-in', indexController.getLogIn);

// POST log in form
router.get('/log-in', indexController.postLogIn);

// GET members form
router.get('/members', indexController.getMembers);

// POST members form
router.post('/members', indexController.postMembers);

// GET admin form
router.get('/admin', indexController.getAdmin);

// POST admin form
router.post('/admin', indexController.postAdmin);

module.exports = router;
