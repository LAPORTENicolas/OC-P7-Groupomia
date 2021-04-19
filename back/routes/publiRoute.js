const express   = require('express');
const auth      = require('../middlewares/auth');
const multer    = require('../middlewares/multer');
const ctrlPubli = require('../controllers/publiCtrl')
const router    = express.Router();

router.post('/new', auth, multer, ctrlPubli.new);
router.delete('/delete', auth, ctrlPubli.delete);
router.delete('/deleteAdmin', auth, ctrlPubli.deleteAdmin);
router.put('/edit', auth, multer, ctrlPubli.edit);
router.put('/editAdmin', auth, multer, ctrlPubli.edit);
router.get('/getAll/:id', auth, ctrlPubli.getAllPubli);
router.post('/getAll', auth, ctrlPubli.getAll);
router.post('/getAllFrom', auth, ctrlPubli.getAllFrom);
router.get('/getOne/:id', auth, ctrlPubli.getOnePubli);

module.exports  = router;