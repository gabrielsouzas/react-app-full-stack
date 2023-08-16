const express = require('express');
const cors = require('cors');
const clienteRouter = require('./routes/clienteRouter');
const authRouter = require('./routes/authRouter');
const userRouter = require('./routes/userRouter');
const whitelistRouter = require('./routes/whitelistRouter');

const app = express();

app.use(express.json());
app.use(cors());
app.use(clienteRouter);
app.use(authRouter);
app.use(userRouter);
app.use(whitelistRouter);

module.exports = app;