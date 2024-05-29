const { Router } = require('express');

// api handlers
const { listarGameAPI, dataJuegoAPI} = require('../api/game.api');

const router = Router();
router.get('/gameAPI', listarGameAPI);
router.post('/dataJuego', dataJuegoAPI);


module.exports = router;