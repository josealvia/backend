const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

const {MONGO_URI} = require('./config');
const {PORT} = require('./config');

//Coneccion DB
mongoose.connect(MONGO_URI,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify:false
});
//setings
//puerto
app.set('port', PORT);

app.use(cors());
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json())

//Routes
const {EmpresaRuote, VacanteRoute} = require('./routes');

app.use('/api/empresa', EmpresaRuote);
app.use('/api/vacante', VacanteRoute);

//empezando el servidor
app.listen(app.get('port'),()=>{
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});