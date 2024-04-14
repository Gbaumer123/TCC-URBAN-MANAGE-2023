const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController/usuarioController');
const veiculoController = require('../controllers/veiculoController/veiculoController')
const funcionarioController = require ('../controllers/funcionarioController/funcionarioController')
const equipeController = require ('../controllers/equipeController/equipeController')


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

// Rotas Funcionarios
router.post('/adicionaFuncionario', funcionarioController.adicionaFuncionario);
router.put('/atualizarFuncionario', funcionarioController.atualizarFuncionario);
router.delete('/excluirFuncionario/:id', funcionarioController.excluirFuncionario);
router.get('/listarFuncionarios', funcionarioController.listarFuncionarios);
router.get('/listarFuncionarios/:id', funcionarioController.buscarFuncionarioPorId);
module.exports = router;

//Rotas Equipes
router.post('/adicionaEquipe', equipeController.adicionaEquipe);
router.put('/atualizarEquipe', equipeController.atualizarEquipe);
router.delete('/excluirEquipe/:id', equipeController.excluirEquipe);
router.get('/listarEquipes', equipeController.listarEquipes);
router.get('/listarEquipes/:id', equipeController.buscarEquipePorId);
module.exports = router;

router.post('/vincularFuncionarioEquipe', equipeController.vincularFuncionarioEquipe);



