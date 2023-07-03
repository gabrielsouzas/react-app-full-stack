const express = require('express');

const router = express.Router();

const clienteController = require('../controllers/clienteController');
const clienteMiddleware = require('../middlewares/clienteMiddleware');

router.get('/clientes', clienteController.getAll);

router.post('/clientes', clienteMiddleware.validateFieldNome, clienteController.createCliente);

router.put('/clientes/:idcliente', 
    clienteMiddleware.validateFieldNome,
    clienteController.updateCliente,
);

router.delete('/clientes/:idcliente', clienteController.deleteCliente);

module.exports = router;