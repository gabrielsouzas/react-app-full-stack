const express = require('express');

const router = express.Router();

const clienteController = require('../controllers/clienteController');
const clienteMiddleware = require('../middlewares/clienteMiddleware');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/clientes', 
    authMiddleware.authenticateToken, 
    clienteController.getAll);

router.get('/cliente/:idcliente', 
    authMiddleware.authenticateToken, 
    clienteController.getById);

router.post('/clientes', 
    authMiddleware.authenticateToken, 
    clienteMiddleware.validateFieldNome, 
    clienteController.createCliente);

router.put('/clientes/:idcliente',
    authMiddleware.authenticateToken,
    clienteMiddleware.validateFieldNome,
    clienteController.updateCliente,
);

router.delete('/clientes/:idcliente',
    authMiddleware.authenticateToken, 
    clienteController.deleteCliente);

module.exports = router;