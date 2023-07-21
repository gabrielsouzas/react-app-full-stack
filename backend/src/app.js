const express = require('express');
const cors = require('cors');
const clienteRouter = require('./routes/clienteRouter');
const authRouter = require('./routes/authRouter');
const userRouter = require('./routes/userRouter');

const app = express();

app.use(express.json());
app.use(cors());
app.use(clienteRouter);
app.use(authRouter);
app.use(userRouter);

module.exports = app;