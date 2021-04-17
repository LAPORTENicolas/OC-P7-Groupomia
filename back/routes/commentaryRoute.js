const express           = require('express');
const auth              = require('../middlewares/auth');
const ctrlCommentary    = require('../controllers/commentaryCtrl')
const router            = express.Router();

router.post('/new', auth, ctrlCommentary.new)
router.get('/getAll/:id', auth, ctrlCommentary.getAllFromId)

module.exports  = router;