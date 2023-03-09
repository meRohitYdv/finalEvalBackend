const router = require('express').Router();
const controller = require('../controllers/content');

router.post('/create', controller.createContent);
router.get('/', controller.getAllContents);
router.post('/addField', controller.addFieldToContent);
// router.delete('/deleteField', controller.deleteFieldFromContent);

module.exports = router;