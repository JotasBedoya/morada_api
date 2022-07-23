const jwt = require('jsonwebtoken');

const secret = 'millavesecreta';

const payload = {
    Nombre: 'juan',
    id: 123455,
    perfil: 'admin'

};

const token = jwt.sign(payload, secret, { expiresIn: '1m' });
console.log(token);

// decodificar Token

const decoded = jwt.verify(token, secret);
console.log(decoded);