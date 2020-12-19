const User = require('../../models/userModel/users');
const bcrypt = require('bcrypt-nodejs');
const { ExtractJwt } = require('passport-jwt');
const userController= {};
const jwt = require('jsonwebtoken');

userController.getUsers = async (req, res) => {
    const users = await User.find();
    res.send(users);
}

userController.createUsers = async(req, res) => {
    const newUser = new User({
        rol: req.body.rol,
        name: req.body.name, 
        firstName: req.body.firstName, 
        secondName: req.body.secondName, 
        nickName: req.body.nickName, 
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password)
    });
    await newUser.save();
    const expiresIn = 24*60*60;
    const token = await jwt.sign({_id:newUser._id}, 'secretKey',{expiresIn:expiresIn});
    const dataUser = {
        id:newUser._id,
        rol: newUser.rol,
        name:newUser.name,
        email:newUser.email,
        firstName: newUser.firstName,
        secondName: newUser.secondName,
        nickName: newUser.nickName,
        password: newUser.password,
        accessToken:token,
        expiresIn:expiresIn
    }

    res.send(dataUser);
};

userController.singnWithUser = async(req, res) => {
    const {email,password} = req.body;
    
    const user = await User.findOne({email});

    if(!user){
        return res.status(401).send('El email no existe');
    }else{
        const resultPassword = bcrypt.compareSync(password, user.password);
        if(resultPassword){
            const expiresIn=30*60;
            const accessToken = jwt.sign({id:user._id}, 'SecretKey', {expiresIn:expiresIn});

            const dataUser = {
                id:user._id,
                rol: user.rol,
                name:user.name,
                email:user.email,
                firstName: user.firstName,
                secondName: user.secondName,
                nickName: user.nickName,
                password: user.password,
                accessToken:accessToken,
                expiresIn:expiresIn
            }
            res.send({dataUser});
        }else { 
            res.status(409).send({message:'Algo ha ido mal.'})
        }
    }
}

userController.getOneUser = async(req, res) => {
    const {id} = req.params;
    const user = await User.findById(id);
    res.send(user);
};

userController.getOneUserByEmail = async(req, res) => {
    const {email} = req.params;
    const user = await User.findOne({email: email});
    res.send(user);
}

userController.deleteUser = async(req,res) => {
    const {id} = req.params;
    await User.findByIdAndDelete(id);
    res.json({
        status: 'Usuario eliminado'
    });
};

userController.updateUser = async(req,res) => {
    const{id} = req.params;
    const newUser = {
        rol: req.body.rol,
        name: req.body.name, 
        firstName: req.body.firstName, 
        secondName: req.body.secondName, 
        nickName: req.body.nickName, 
        email: req.body.email,
        password: req.body.password
    }
    await User.findByIdAndUpdate(id, {$set:newUser}, {new:true});
    res.json({
        status: 'Usuario actualizado'
    });
}

module.exports = userController;