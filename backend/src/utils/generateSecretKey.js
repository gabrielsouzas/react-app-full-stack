const crypto = require('crypto');

// Gera uma chave secreta aleatória com 64 bytes (512 bits)
const chaveSecreta = crypto.randomBytes(64).toString('hex');

console.log('Chave secreta:', chaveSecreta);