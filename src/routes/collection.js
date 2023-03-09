const router = require('express').Router();
const controller = require('../controllers/collection');

router.post('/create', controller.createCollection);
router.put('/update', controller.updateCollection);
router.delete('/delete/:id', controller.deleteCollection);
router.get('/:contentName', controller.getCollections);

module.exports = router;