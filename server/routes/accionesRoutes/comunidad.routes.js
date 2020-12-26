const router = require('express').Router();

const comunidadController = require('../../controllers/comunidadController/comunidadController.js');

router.get('/', comunidadController.getComunidades);
router.get('/:idComunidad', comunidadController.getOneComunidad);
router.post('/:idUser', comunidadController.createComunidad);

module.exports = router;
