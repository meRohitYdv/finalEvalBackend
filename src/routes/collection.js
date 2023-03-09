const router = require('express').Router();
const controller = require('../controllers/collection');

router.post('/create', controller.createCollection);
router.put('/update', controller.updateCollection);

module.exports = router;