const express   = require('express');
const auth      = require('../middlewares/auth');
const authCtrl  = require('../controllers/authCtrl');
const router    = express.Router();

router.post('/login', authCtrl.login);
router.post('/register', authCtrl.register);
router.post('/delete', auth, authCtrl.delete);

module.exports  = router;