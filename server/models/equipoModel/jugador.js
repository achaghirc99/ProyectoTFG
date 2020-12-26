const { model } = require('../comunidadModel/comunidad');
const {Schema} = mongoose; 


const jugador_schema = new Schema ({
    id: {type: Number, required:true},
    name: {type:String, required: true},
    position: {
        type:String,
        enum:['Guard','Center','Forward']
    },
    marketValue: {type:Number},
    status: {
        type:String, 
        enum: ['Transferible','Libre','ConEquipo']
    },
    team: {
        type: Schema.ObjectId,
        ref: "equipo"
    }
})

module.exports = mongoose.model('jugador', jugador_schema);