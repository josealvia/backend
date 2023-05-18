const {Schema, model} = require('mongoose');

const usuarioSchema = new Schema(
    {
        nombre:{type:String},
        apellido:{type:String},
        cedula:{type:String},
        estadocivil:{type:String},
        formacion:{type:String},
        experiencia:{type:String},
        telefono: {type:String},
        direccion: {type:String},
        email:{type:String},
        password:{type:String},
    }
);

usuarioSchema.methods.toJSON = function(){
    let usuario = this.toObject();
    delete usuario.password;
    return usuario;
}
module.exports = model('Usuarios',usuarioSchema);