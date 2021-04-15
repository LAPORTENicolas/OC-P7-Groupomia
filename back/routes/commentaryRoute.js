const express           = require('express');
const auth              = require('../middlewares/auth');
const ctrlCommentary    = require('../controllers/commentaryCtrl')
const router            = express.Router();

router.post('/new', ctrlCommentary.new)

module.exports  = router;