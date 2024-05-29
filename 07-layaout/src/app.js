const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');
const config = require('./config.js');
const routes = require('./routes.js');

const app = express();

// Config
app.set('port', config.port);

// Middlewares
app.use(cors());
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json({ limit: '25mb' }));

// Servir archivos estáticos desde la carpeta 'front'
app.use(express.static(path.join(__dirname, '../front')));

// Ruta para servir el archivo HTML principal
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../front/index.html'));
});

// Routes
app.use(routes);

module.exports = app;
