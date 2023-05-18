const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');
const {Schema} = mongoose;


const empresaSchema = new Schema(
    {
        nombre: {
            type:String, 
            required: [true, 'El nombre de la empresa es obligatorio']},
        descripcion: {
            type:String, 
            required: [true, 'La descripcion es obligatoria']},
        ruc: {
            type:String, 
            required: [true, 'El ruc es obligatorio']},
        telefono: {
            type:String, 
            required: [true, 'El telefono es obligatorio']},
        direccion: {
            type:String, 
            required: [true, 'La direccion es obligatoria']},
        email: {
            type:String, 
            required: [true, 'El email es obligatorio']},
        password: {
            type:String, 
            required: [true, 'La contraseña es obligatoria']}
    }
);

empresaSchema.methods.encrypPassword = async(password)=>{
    const salt = await bcrypt.genSalt();
    return bcrypt.hash(password, salt);
};

empresaSchema.methods.validatePassword = function(password){
    return bcrypt.compare(password, this.password);
}

empresaSchema.methods.toJSON = function(){
    let empresa = this.toObject();
    delete empresa.password;
    return empresa;
}

module.exports = mongoose.model('Empresas',empresaSchema);