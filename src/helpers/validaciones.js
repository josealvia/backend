const {EmpresaModel, VacanteModel} = require('../models')

const soloDigitos = (cadena)=>{
    cadena = cadena.split('');
    for (let i = 0; i < cadena.length; i++) {
        if(!!parseInt(cadena[i]) == false && cadena[i] !== '0'){
            return false;
        }
    }
    return true;
}

const validarEmpresa = async (entity)=>{
    let empresa = await EmpresaModel.findOne({nombre: entity.nombre});
    if(empresa){
        const error = new Error();
        error.status = 401;
        error.message = 'La nombre de la empresa ya existe';
        throw error;
    }
    if(!soloDigitos(entity.ruc) || entity.ruc.length != 13){
        const error = new Error();
        error.status = 401;
        error.message = 'El ruc debe tener 13 dígitos';
        throw error;
    }
    if(!soloDigitos(entity.telefono) || entity.telefono.length != 10){
        const error = new Error();
        error.status = 401;
        error.message = 'El telefono debe tener 10 dígitos';
        throw error;
    }
    empresa = await EmpresaModel.findOne({email: entity.email});
    if(empresa){
        const error = new Error();
        error.status = 401;
        error.message = 'El email ya esta en registrado!';
        throw error;
    }
}
const validarEmpresaUpdate = async (id,entity)=>{
    const res = await EmpresaModel.findById(id);
    const empresa = await EmpresaModel.findOne({nombre: entity.nombre});
    if(empresa && empresa.nombre !== res.nombre){
        const error = new Error();
        error.status = 401;
        error.message = 'La nombre de la empresa ya existe';
        throw error;
    }
    if(!soloDigitos(entity.ruc) || entity.ruc.length != 13){
        const error = new Error();
        error.status = 401;
        error.message = 'El ruc debe tener 13 dígitos';
        throw error;
    }
    if(!soloDigitos(entity.telefono) || entity.telefono.length != 10){
        const error = new Error();
        error.status = 401;
        error.message = 'El telefono debe tener 10 dígitos';
        throw error;
    }
}



const validarIdVacante = async(id)=>{
    const vacante = await VacanteModel.findById(id);
    if(!vacante){
        const error = new Error();
        error.status = 400;
        error.message = 'El id de la vacante no existe!'
        throw error;
    }
    return vacante;
}

module.exports = {
    validarEmpresa,
    validarIdVacante,
    validarEmpresaUpdate
}