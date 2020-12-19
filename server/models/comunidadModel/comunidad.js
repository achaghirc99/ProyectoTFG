const mongoose = require('mongoose');
const {Schema} = mongoose;
/* const User = require('../userModel/users')*/
/* const users = mongoose.Schema(users); */

const comunidad_schema = new Schema({
    nombre: {type:String, required:true, unique:true},
    contraseña: {type:String, required:false},
    numIntegrantes: {type:Number, required:true},
    presupuesto: {type: Number, required:true},
    tipo: {
        type:String,
        enum: ['Public', 'Private'],
        default: 'Public'
    },
    users: [{
        type: Schema.ObjectId,
        ref: "users"
    }]
}) 

module.exports = mongoose.model('comunidad', comunidad_schema);