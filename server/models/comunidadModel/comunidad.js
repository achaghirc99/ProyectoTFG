const mongoose = require('mongoose');
const {Schema} = mongoose;
/* const User = require('../userModel/users')*/
/* const users = mongoose.Schema(users); */

const comunidad_schema = new Schema({
    name: {type:String, required:true, unique:true},
    password: {type:String, required:false},
    numIntegrants: {type:Number, required:true},
    budget: {type: Number, required:true},
    type: {
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