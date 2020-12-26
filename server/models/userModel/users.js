const mongoose = require('mongoose');
const {Schema} = mongoose;
const bcrypt =require('bcrypt-nodejs');

//Creamos el esquema para un usuario

const user_schema = new Schema({
    rol: {
        type:String,
        enum: ['user','administrator','participante'],
        default:'user',
        required:true
    },
    name: {type:String, required:true},
    firstName: {type:String, required:true},
    secondName: {type :String, required:true},
    nickName: {type:String, required:true},
    email: {type:String, required:true},
    password: {type:String, required:true},
    comunidad: {
        type: Schema.ObjectId,
        ref: 'comunidad'
    },
    equipo: {
        type: Schema.ObjectId,
        ref: "equipo"
    }
});

user_schema.methods.encryptPassword = (password) => { 
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};

user_schema.methods.comparePasswords = function(password) {
    return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('users', user_schema);