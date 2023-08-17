const express = require('express');

const router = express.Router();

const whitelistController = require('../controllers/whitelistController');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/whitelist/:token', 
    authMiddleware.authenticateToken, 
    whitelistController.getWhitelist
);

router.post('/whitelist',
    authMiddleware.authenticateToken,
    whitelistController.createWhitelist,
);

router.delete('/whitelist/:token',
    authMiddleware.authenticateToken, 
    whitelistController.deleteWhitelist);


module.exports = router;