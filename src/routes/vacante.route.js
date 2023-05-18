const {Router} = require('express');
const router = Router();

const { verifyToken, validarRequire } = require('../middlewares')
const {VacanteController} = require('../controllers')

router.get('/all', VacanteController.getAll);

router.get('/', verifyToken, VacanteController.getAllByEmpresa);

router.get('/:vacanteId', VacanteController.get);

router.post('/', [
    verifyToken,
    validarRequire], 
    VacanteController.create
);

router.put('/:vacanteId', [
    verifyToken,
    validarRequire], 
    VacanteController.update
);

router.delete('/:vacanteId', 
    verifyToken, 
    VacanteController.delete
);

router.post('/addSolicitud',
    validarRequire,
    VacanteController.addSolicitud
);

module.exports = router;