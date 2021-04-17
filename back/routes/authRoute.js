const express   = require('express');
const auth      = require('../middlewares/auth');
const authCtrl  = require('../controllers/authCtrl');
const router    = express.Router();

router.post('/login', authCtrl.login);
router.post('/register', authCtrl.register);
router.delete('/delete', auth, authCtrl.delete);
router.post('/edit', auth, authCtrl.edit);

module.exports  = router;