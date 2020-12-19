const { model } = require('../comunidadModel/comunidad');
const {Schema} = mongoose; 


const jugador_schema = new Schema ({
    id: {type: Number, required:true},
    nombre: {type:String, required: true},
    posicion: {
        type:String,
        enum:['Guard','Center','Forward']
    },
    valorMercado: {type:Number},
    estado: {
        type:String, 
        enum: ['Transferible','Libre','ConEquipo']
    }
})

module.exports = mongoose.model('Jugador', jugador_schema);