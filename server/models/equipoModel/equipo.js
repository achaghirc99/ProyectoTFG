const mongoose = require('mongoose');
const { model } = require('../comunidadModel/comunidad');
const {Schema} = mongoose; 
const {Jugador} = mongoose.Schema(Jugador);

const equipo_schema = new Schema ({
    id: {type: Number, required:true},
    nombre: {type:String, required: true},
    presupuesto: {type:Number, required:true}, 
    numJugadores: {type:Number, required:true},

    jugadores: {
        type: Schema.ObjectId,
        ref: "Jugador"
    }
})

module.exports = mongoose.model('Equipo', equipo_schema);