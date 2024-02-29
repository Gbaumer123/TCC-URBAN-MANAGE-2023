const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController/usuarioController');
const veiculoController = require('../controllers/veiculoController/veiculoController')

// Rotas Usuarios
router.post('/adicionaUsuario', usuarioController.adicionaUsuario);
router.put('/atualizarUsuario', usuarioController.atualizarUsuario);
router.delete('/excluirUsuario/:id', usuarioController.excluirUsuario);
router.get('/listarUsuarios', usuarioController.listarUsuarios);
router.get('/listarUsuarios/:id', usuarioController.buscarUsuarioPorId);


// Rotas Veiculos
router.post('/adicionaVeiculo', veiculoController.adicionaVeiculo);
router.put('/atualizarVeiculo', veiculoController.atualizarVeiculo);
router.delete('/excluirVeiculo/:id', veiculoController.excluirVeiculo);
router.get('/listarVeiculos', veiculoController.listarVeiculos);
router.get('/listarVeiculos/:id', veiculoController.buscarVeiculoPorId);
module.exports = router;
