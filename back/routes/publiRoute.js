const express   = require('express');
const auth      = require('../middlewares/auth');
const multer    = require('../middlewares/multer');
const ctrlPubli = require('../controllers/publiCtrl')
const router    = express.Router();

router.post('/new', auth, multer, ctrlPubli.new);
router.put('/edit', auth, multer, ctrlPubli.new);

module.exports  = router;