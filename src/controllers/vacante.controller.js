const { VacanteService } = require('../services');

class VacanteController{
    async getAll(req, res){
        try {
            const data = await VacanteService.getAll();
            res.json({data});
        } catch (error) {
            res.json({error})
        }
    }

    async getAllByEmpresa(req, res){
        try {
            const {empresaId} = req;
            const data = await VacanteService.getAllByEmpresa(empresaId);
            res.json({data});
        } catch (error) {
            res.json({error})
        }
    }

    async get(req, res){
        try {
            const {vacanteId} = req.params;
            const {empresaId} = req;
            const data = await VacanteService.get(vacanteId, empresaId);
            res.json({data});
        } catch (error) {
            res.json({error})
        }
    }

    async create(req, res){
        try {    
            const {empresaId} = req;       
            const data = await VacanteService.create(req.body, empresaId);
            res.json({data});
        } catch (error) {
            res.json({error})
        }
    }

    async update(req, res){
        try {
            const {vacanteId} = req.params;
            const data = await VacanteService.update(vacanteId, req.body);
            res.json({data});
        } catch (error) {
            res.json({error});
        }
    }

    async delete(req, res){
        try {
            const {vacanteId} = req.params;
            const data = await VacanteService.delete(vacanteId);
            res.json({data});
        } catch (error) {
            res.json({error});
        }
    }

    async addSolicitud(req, res){
        try {
            const {vacanteId} = req.params;
            const {estudianteId} = req.body;
            const data = await VacanteService.addSolicitud(vacanteId, estudianteId);
            res.json({data});
        } catch (error) {
            res.json({error});
        }
    }
    
}

module.exports = new VacanteController();