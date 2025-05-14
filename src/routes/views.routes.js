const express = require('express');
const viewsController = require('../controllers/viewsController');

const router = express.Router();

router.get('/', viewsController.renderHome);
router.get('/realtimeproducts', viewsController.renderRealTimeProducts);

module.exports = router;