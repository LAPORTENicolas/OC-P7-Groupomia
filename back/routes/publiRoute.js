const express   = require('express');
const auth      = require('../middlewares/auth');
const multer    = require('../middlewares/multer');
const ctrlPubli = require('../controllers/publiCtrl')
const router    = express.Router();

router.post('/new', auth, multer, ctrlPubli.new);
router.put('/edit', auth, multer, ctrlPubli.new);
router.get('/getAll', auth, ctrlPubli.getAllPubli);
router.get('/getOne/:id', auth, ctrlPubli.getOnePubli);

module.exports  = router;