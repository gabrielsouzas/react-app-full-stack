const express = require('express');

const router = express.Router();

const userController = require('../controllers/userController');
//const userMiddleware = require('../middlewares/userMiddleware');

router.get('/users', userController.getAll);

router.get('/user/:iduser', userController.getById);

router.post('/users', /*userMiddleware.validateFieldNome,*/ userController.createUser);

router.put('/users/:iduser', 
    /*userMiddleware.validateFieldNome,*/
    userController.updateUser,
);

router.delete('/users/:iduser', userController.deleteUser);

module.exports = router;