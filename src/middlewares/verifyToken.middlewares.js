const jwt = require('jsonwebtoken');
const { EmpresaModel } = require('../models');
const config = require('../config');

const verifyToken = async(req, res, next)=>{
    try {
        const token = req.headers['x-access-token'];
        if(!token){
            const error = new Error();
            error.status = 401;
            error.message = 'El token es invalido'
            return res.json({ error });
        }

        const decoded = jwt.verify(token, config.SECRET);
        
        const empresa = await EmpresaModel.findById(decoded.id);
        if(!empresa){
            const error = new Error();
            error.status = 400;
            error.message = 'El id de la empresa no existe!'
            return res.json({ error });
        }

        req.empresaId = decoded.id;
        next();
    } catch (error) {
        return res.json({error});
    }
}
module.exports = verifyToken;