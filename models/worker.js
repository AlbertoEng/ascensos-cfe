const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const workerSchema = new Schema({
    nombre: {
        type: String,
        required: true
    },
    apellido: {
        type: String,
        required: true
    },
    rpe:{
        type: String,
        required: true
    },
    antiguedad: {
        type: Number,
        required: true
    },
    fechaUltimoAscenso: {
        type: Date,
        default: new Date()
    },
    statusMovimiento: {
        type: String,
        default: 'Sin Especificar'
    },
})

var Worker = mongoose.model('Worker',workerSchema);

module.exports = Worker;