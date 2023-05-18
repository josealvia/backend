const {Router} = require('express');
const router = Router();

const {verifyToken, validarRequire} = require('../middlewares');
const {EmpresaController} = require('../controllers')

router.get('/all',
    EmpresaController.getAll)

router.get('/',
    verifyToken,
    EmpresaController.get);

router.post('/signup', 
    validarRequire,
    EmpresaController.signup
);

router.post('/signin',
    validarRequire, 
    EmpresaController.signin
);

router.put('/', [
    verifyToken,
    validarRequire
    ], EmpresaController.update);

router.delete('/', verifyToken, EmpresaController.delete);


module.exports = router;