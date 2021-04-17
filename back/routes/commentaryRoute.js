const express           = require('express');
const auth              = require('../middlewares/auth');
const ctrlCommentary    = require('../controllers/commentaryCtrl')
const router            = express.Router();

router.post('/new', auth, ctrlCommentary.new)
router.get('/getAll/:id', auth, ctrlCommentary.getAllFromId)
router.delete('/delete', auth, ctrlCommentary.delete);
router.delete('/deleteAdmin', auth, ctrlCommentary.deleteAdmin);

module.exports  = router;