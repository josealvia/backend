const { VacanteModel } = require('../models')
const { validaciones } = require('../helpers');
const { validarIdVacante } = validaciones;


class VacanteService{
    async getAll(){
        const vacantes = await VacanteModel.find().populate('_empresa');
        return vacantes;
    }

    async getAllByEmpresa(_empresa){
        return await VacanteModel.find({_empresa});
    }

    async get(id, _empresa){
        await validarIdVacante(id);
        return await (await VacanteModel.findOne({_id:id, _empresa}));
    }

    async create(entity, _empresa){
        const vacante = {
            titulo : entity.titulo,
            descripcion : entity.descripcion,
            _empresa
        }
        return await VacanteModel.create(vacante);
    }
    
    async update(id, entity){
        await validarIdVacante(id);
        if(entity._estudiante){
            entity.estado = false;
        }
        else{
            entity.estado = true;
        }
        return VacanteModel.findByIdAndUpdate(id, entity);
    }

    async delete(id){
        await validarIdVacante(id);
        return await VacanteModel.findByIdAndDelete(id);
    }

    async addSolicitud(id, _estudiante){
        const vacante = await validarIdVacante(id);
        if(!_estudiante){
            const error = new Error();
            error.status = 400;
            error.message = 'El id del estudiante no ha sido enviado';
            throw error;
        }
        vacante.solicitudes.push(_estudiante);
        return await vacante.save();
    }
}

module.exports = new VacanteService();