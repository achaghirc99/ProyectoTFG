const Comunidad = require('../../models/comunidadModel/comunidad');
const User = require('../../models/userModel/users');

const comunidadController = {};



comunidadController.getComunidades = async (req, res) => {
    const comunidades = await Comunidad.find();
    req.send(comunidades);
};

comunidadController.createComunidad = async(req, res) => {
    const comunidad = new Comunidad({
        nombre:req.body.nombre, 
        contraseña: req.body.contraseña, 
        numIntegrantes: req.body.numIntegrantes,
        presupuesto: req.body.presupuesto,
        tipo: req.body.tipo,    
    });
    await comunidad.save()
    .then(async res => {
        try {
            const user =  await User.findById(req.params.idUser);
            console.log(user);
            comunidad.users.push(user);
        }catch(err) {
            throw new Error('Error creando la comunidad');
        }
    }).catch(error => {
        console.log(error)
    });
    res.send(comunidad);
};

module.exports = comunidadController;