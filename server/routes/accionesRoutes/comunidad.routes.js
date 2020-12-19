const router = require('express').Router();

const comunidadController = require('../../controllers/comunidadController/comunidadController.js');

router.get('/', comunidadController.getComunidades);
router.post('/:idUser', comunidadController.createComunidad);

module.exports = router;
