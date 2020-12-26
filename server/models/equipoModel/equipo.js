const mongoose = require('mongoose');
const { model } = require('../comunidadModel/comunidad');
const {Schema} = mongoose; 
const {Jugador} = mongoose.Schema(Jugador);

const equipo_schema = new Schema ({
    id: {type: Number, required:true},
    name: {type:String, required: true},
    budget: {type:Number, required:true}, 
    numPlayers: {type:Number, required:true},
    players: [{
        type: Schema.ObjectId,
        ref: "jugador"
    }],
    user: {
        type: Schema.ObjectId,
        ref: "users",
        required: false
    }
})

module.exports = mongoose.model('equipo', equipo_schema);