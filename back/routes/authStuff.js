const express   = require('express');
const authCtrl  = require('../controllers/authCtrl');
const router    = express.Router();

router.post('/login', authCtrl.login);
router.post('/register', authCtrl.register);

module.exports  = router;