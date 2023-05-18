const {sign} = require('jsonwebtoken');
const {SECRET} = require('../config');

const generarToken = (id)=>{
    const token = sign({
        id
    },
        SECRET,{
        expiresIn: 60 * 60
    });
    return token;
}

module.exports = generarToken;