const mongoose = require("mongoose");
const {Schema} = mongoose;


const vacanteSchema = new Schema({
    titulo : {
        type: String,
        required: [true, 'El titulo de la vacante es requerido']},
    descripcion : {
        type:String,
        required: [true, 'La descripcion es requerida']},
    fecha: {
        type: Date, 
        default: Date.now()},
    estado: {
        type: Boolean, 
        default: true},
    _empresa:{
        type: Schema.Types.ObjectId,
        ref:'Empresas'},
    solicitudes: [{
        type: Schema.Types.ObjectId,
        ref: 'Usuarios',
        autopopulate: true}],
    _estudiante:{
        type: Schema.Types.ObjectId, 
        ref: 'Usuarios',
        default: null,
        autopopulate: true}
});

vacanteSchema.plugin(require('mongoose-autopopulate'));

module.exports = mongoose.model('Vacantes',vacanteSchema);