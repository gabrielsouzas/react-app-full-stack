const express = require('express');

const router = express.Router();

const authController = require('../controllers/authController');
//const authMiddleware = require('../middlewares/authMiddleware');


router.post('/auth', authController.authUser);

router.get('/auth/verify-token', authController.verifyToken);


module.exports = router;