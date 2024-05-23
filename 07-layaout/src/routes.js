const Router = require('express');

const authRoutes = require('./modules/auth/routes/auth.routes');
const clienteRoutes = require('./modules/clientes/routes/clientes.routes');
const gameRoutes = require('./modules/game/routes/game.routes');

const router = Router();

// Status api endpoint
router.get('/api-status', (req, res) => {
    return res.send({ 'status': 'on' });
});

router.use(authRoutes);
router.use(clienteRoutes);
router.use(gameRoutes);



module.exports = router;