const {EmpresaService} = require('../services');



class EmpresaController{
    
    async getAll(req, res){
        const data = await EmpresaService.getAll();
        res.json({data});
    }

    async get(req, res){
        try {
            const {empresaId} = req;
            const data = await EmpresaService.get(empresaId);
            res.json({data})            
        } catch (error) {
            res.json({error})
        }
    }

    async signup(req, res){
        try {
            const data = await EmpresaService.signup(req.body);
            res.json({data});
        } catch (error) {
            res.json({error});
        }
    }

    async signin(req, res){
        try {
            const data = await EmpresaService.signin(req.body);
            res.json({data});
        } catch (error) {
            res.json({error})
        }
    }

    async update(req, res){
        try {
            const {empresaId} = req
            const data = await EmpresaService.update(empresaId, req.body);
            res.json({data});
        } catch (error) {
            res.json({error});
        }
    }

    async delete(req, res){
        try {
            const {empresaId} = req
            const data = await EmpresaService.delete(empresaId);
            res.json({data});
        } catch (error) {
            res.json({error});
        }
    }
}

module.exports = new EmpresaController();