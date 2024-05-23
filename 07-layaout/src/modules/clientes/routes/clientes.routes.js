const { Router } = require('express');
const express = require('express');
const bodyParser = require('body-parser');
const { exec } = require('child_process');

// api handlers
const { listarPermisoAPI, actualizarPermisoAPI, crearPermisoAPI, eliminarPermisoAPI, crearRolAPI, listarRolAPI, actualizarRolAPI, eliminarRolAPI, crearUsuarioAPI, listarUsuarioAPI, actualizarUsuarioAPI, eliminarUsuarioAPI, crearGameAPI, listarGameAPI, actualizarGameAPI, eliminarGameAPI} = require('../api/clientes.api');



const router = Router();



router.post('/permiso', crearPermisoAPI);

router.get('/permiso', listarPermisoAPI); 

router.patch('/permiso', actualizarPermisoAPI); 

router.delete('/permiso', eliminarPermisoAPI);

router.post('/rol', crearRolAPI);

router.get('/rol', listarRolAPI);

router.patch('/rol', actualizarRolAPI); 

router.delete('/rol', eliminarRolAPI);

router.post('/user', crearUsuarioAPI);

router.get('/user', listarUsuarioAPI);

router.patch('/user', actualizarUsuarioAPI); 

router.delete('/user', eliminarUsuarioAPI);

router.post('/game', crearGameAPI);

router.get('/game', listarGameAPI);

router.patch('/game', actualizarGameAPI); 

router.delete('/game', eliminarGameAPI); 


module.exports = router;