const router = require('express').Router();
const controller = require('../controllers/collection');

router.post('/create', controller.createCollection);
module.exports = router;