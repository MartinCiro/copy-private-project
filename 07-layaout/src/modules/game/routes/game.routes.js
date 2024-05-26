const { Router } = require('express');
const express = require('express');
const bodyParser = require('body-parser');
const { exec } = require('child_process');

// api handlers
const { listarGameAPI, dataJuegoAPI} = require('../api/game.api');

const router = Router();
router.get('/gameAPI', listarGameAPI);
router.post('/dataJuego', dataJuegoAPI);


module.exports = router;