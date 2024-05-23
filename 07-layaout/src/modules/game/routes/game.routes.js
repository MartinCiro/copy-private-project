const { Router } = require('express');
const express = require('express');
const bodyParser = require('body-parser');
const { exec } = require('child_process');

// api handlers
const { crearGameAPI, listarGameAPI, actualizarGameAPI, eliminarGameAPI} = require('../api/game.api');

const router = Router();
router.post('/gameAPI', crearGameAPI);

router.get('/gameAPI', listarGameAPI); 

router.patch('/gameAPI', actualizarGameAPI); 

router.delete('/gameAPI', eliminarGameAPI);


module.exports = router;