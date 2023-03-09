const router = require('express').Router();
const controller = require('../controllers/content');

router.post('/create', controller.createContent);
router.get('/', controller.getAllContents);
router.post('/addField', controller.addFieldToContent);
router.delete('/deleteField', controller.deleteFieldFromContent);
router.get('/fields/:contentName', controller.getfieldsFromContentName);

module.exports = router;