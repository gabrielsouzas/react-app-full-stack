const express = require('express');

const router = express.Router();

const clienteController = require('../controllers/clienteController');
const clienteMiddleware = require('../middlewares/clienteMiddleware');
const authMiddleware = require('../middlewares/authMiddleware');
const whitelistMiddleware = require('../middlewares/whitelistMiddleware');

router.get('/clientes', 
    authMiddleware.authenticateToken,
    whitelistMiddleware.checkTokenInWhitelist,
    clienteController.getAll);

router.get('/cliente/:idcliente', 
    authMiddleware.authenticateToken,
    whitelistMiddleware.checkTokenInWhitelist, 
    clienteController.getById);

router.post('/clientes', 
    authMiddleware.authenticateToken, 
    clienteMiddleware.validateFieldNome, 
    whitelistMiddleware.checkTokenInWhitelist,
    clienteController.createCliente);

router.put('/clientes/:idcliente',
    authMiddleware.authenticateToken,
    whitelistMiddleware.checkTokenInWhitelist,
    clienteMiddleware.validateFieldNome,
    clienteController.updateCliente,
);

router.delete('/clientes/:idcliente',
    authMiddleware.authenticateToken, 
    whitelistMiddleware.checkTokenInWhitelist,
    clienteController.deleteCliente);

module.exports = router;