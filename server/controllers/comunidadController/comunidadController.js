const Comunidad = require('../../models/comunidadModel/comunidad');
const User = require('../../models/userModel/users');

const comunidadController = {};



comunidadController.getComunidades = async (req, res) => {
    const comunidades = await Comunidad.find();
    res.send(comunidades);
};
comunidadController.getOneComunidad = async (req, res) => {
    const {idComunidad} = req.params;
    const comunidad = await Comunidad.findById(idComunidad);
    res.send(comunidad);
}
comunidadController.createComunidad = async(req, res) => {
    const comunidad = new Comunidad({
        name:req.body.name, 
        password: req.body.password, 
        numIntegrants: req.body.numIntegrants,
        budget: req.body.budget,
        type: req.body.type,    
    });
    await comunidad.save()
    .then(async res => {
        try {
            const user =  await User.findById(req.params.idUser);
            const us = new User({
                name:user.name,
                firstName: user.firstName,
                secondName: user.secondName,
                nickName: user.nickName,
                email:user.email,
                password: user.password,
                comunidad: comunidad
            })
            console.log(us);
            comunidad.users.push(user);
            await user.deleteOne(); //Elimino el que ya está 
            await us.save(); //Guardo el nuevo con la comunidad actualizada
            await comunidad.save(); //Guardo la comunidad
        }catch(err) {
            throw err;
        }
    }).catch(error => {
        console.log(error)
    });
    res.send(comunidad);
};

module.exports = comunidadController;