const express = require('express');
const router = express.Router();
const sistemaController = require('../controllers/sistemaController');

// Rotas CRUD
router.post('/adicionaUsuario', sistemaController.adicionaUsuario);
router.put('/atualizarUsuario', sistemaController.atualizarUsuario);
router.delete('/excluirUsuario/:id', sistemaController.excluirUsuario);
router.get('/listarUsuarios', sistemaController.listarUsuarios);
router.get('/listarUsuarios/:id', sistemaController.buscarUsuarioPorId);


module.exports = router;
