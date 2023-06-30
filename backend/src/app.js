const express = require('express');
const cors = require('cors');
const clienteRouter = require('./routes/clienteRouter');

const app = express();

app.use(express.json());
app.use(cors());
app.use(clienteRouter);

module.exports = app;