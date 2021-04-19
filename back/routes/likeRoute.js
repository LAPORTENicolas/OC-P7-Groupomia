const express   = require('express');
const auth      = require('../middlewares/auth');
const ctrlLike  = require('../controllers/likeCtrl')
const router    = express.Router();

router.post('/new', auth, ctrlLike.new)
router.delete('/delete', auth, ctrlLike.delete);

module.exports  = router;