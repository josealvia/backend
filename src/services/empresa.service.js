const { EmpresaModel, VacanteModel } = require('../models');
const { validaciones, generarToken } = require('../helpers');
const { validarEmpresa, validarEmpresaUpdate } = validaciones;

class EmpresaService {

    async getAll(){
        return await EmpresaModel.find();
    }

    async get(id){
        return await EmpresaModel.findById(id);
    }

    async signup(entity) {
        await validarEmpresa(entity);
        const empresa = new EmpresaModel(entity);
        empresa.password = await empresa.encrypPassword(empresa.password);
        await empresa.save();

        let data = {
            _id: empresa._id,
            nombre: empresa.nombre,
            descripcion: empresa.descripcion,
            ruc: empresa.ruc,
            telefono: empresa.telefono,
            direccion: empresa.direccion,
            email: empresa.email
        }

        data.token = generarToken(empresa._id);

        return data;
    }

    async signin(entity){
        const empresa = await EmpresaModel.findOne({email:entity.email});
        if(!empresa){
            const error = new Error();
            error.status = 404;
            error.message = 'Email no esta registrado';
            throw error;
        }

        const passwordIsValid = await empresa.validatePassword(entity.password);
        if(!passwordIsValid){
            const error = new Error();
            error.status = 401;
            error.message = 'Contraseña invalida';
            throw error;
        }

        let data = {
            _id: empresa._id,
            nombre: empresa.nombre,
            descripcion: empresa.descripcion,
            ruc: empresa.ruc,
            telefono: empresa.telefono,
            direccion: empresa.direccion,
            email: empresa.email
        }

        data.token = generarToken(empresa._id);

        return data;
    }

    async update(id, entity){
        if(!id){
            const error = new Error();
            error.status = 400;
            error.message = 'El id no existe!';
            throw error;
        }
        await validarEmpresaUpdate(id, entity);
        if(entity.password){
            if(entity.password.length < 8){
                const error = new Error();
                error.status = 400;
                error.message = 'La contraseña debe tener minimo 8 caracteres!';
                throw error;
            }
            const empresa = await EmpresaModel.findById(id);
            entity.password = await empresa.encrypPassword(entity.password);
        }
        return await EmpresaModel.findByIdAndUpdate(id,entity);
    }

    async delete(id){
        await VacanteModel.deleteMany({_empresa: id});
        return await EmpresaModel.findByIdAndDelete(id);
    }

}

module.exports = new EmpresaService();