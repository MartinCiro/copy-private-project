const { Router } = require('express');
const express = require('express');
const bodyParser = require('body-parser');
const { exec } = require('child_process');

// api handlers
const { listarPermisoAPI, actualizarPermisoAPI, crearPermisoAPI, eliminarPermisoAPI, crearRolAPI, listarRolAPI, actualizarRolAPI, eliminarRolAPI} = require('../api/clientes.api');



const router = Router();



router.post('/permiso', crearPermisoAPI);

router.get('/permiso', listarPermisoAPI); 

router.patch('/permiso', actualizarPermisoAPI); 

router.delete('/permiso', eliminarPermisoAPI);

router.post('/rol', crearRolAPI);

router.get('/rol', listarRolAPI);

router.patch('/rol', actualizarRolAPI); /* actualizarRol */

router.delete('/rol', eliminarRolAPI); /* eliminarPermiso */


module.exports = router;