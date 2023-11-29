const express = require('express');
const router = express.Router();
const sistemaController = require('../controllers/sistemaController');

// Rotas CRUD
router.post('/cadastroUsuario', sistemaController.addUser);
//router.post('/', sistemaController.verificaLogin);
//router.post('/cadastroFuncionario', sistemaController.addFuncionario);
// router.get('/produtos/:id', produtoController.getProdutoById);
// router.put('/produtos/:id', produtoController.updateProduto);
// router.delete('/produtos/:id', produtoController.deleteProduto);

module.exports = router;
