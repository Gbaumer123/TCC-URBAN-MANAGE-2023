// FuncionarioController.js
const FuncionarioModel = require('../../models/funcionarioModel/funcionarioModel');
const EquiFuncModel = require('../../models/equipeFuncModel/equipeFuncModel');


// Rota para adicionar Funcionario
const adicionaFuncionario = async (req, res) => {
  const { nomeFuncionario, cargo, equipe } = req.body;

  try {
    const resultado = await FuncionarioModel.adicionaFuncionario(nomeFuncionario, cargo, equipe);
    console.log('Funcionário cadastrado com sucesso');

    // Vincular o novo funcionário à equipe
    await EquiFuncModel.vincularFuncionarioEquipe(resultado.insertId, equipe);
    console.log('Funcionário vinculado à equipe com sucesso');

    res.status(201).json({ result: 'Funcionário salvo com sucesso', resultado });
  } catch (error) {
    console.error('Erro ao salvar o Funcionário:', error);
    res.status(500).json({ error: 'Erro ao salvar o Funcionário' });
  }
};



const atualizarFuncionario = (req, res) => {
  const { id, nomeFuncionario, cargo, equipe} = req.body;

  FuncionarioModel.atualizarFuncionario(id, nomeFuncionario, cargo, equipe, (err, resultado) => {
    if (err) {
      console.error('Erro ao atualizar o Funcionario:', err);
      return res.status(500).json({ error: 'Erro ao atualizar o Funcionario' });
    }
    console.log('Funcionario atualizado com sucesso')
    res.status(200).json({ message: 'Funcionario atualizado com sucesso', resultado });
  })
};

const excluirFuncionario = (req, res) => {
  const { id } = req.params;

  FuncionarioModel.excluirFuncionario(id, (err, resultado) => {
    if (err) {
      console.error('Erro ao excluir o Funcionario:', err);
      return res.status(500).json({ error: 'Erro ao excluir o Funcionario' });
    }
    console.log('Funcionario excluido com sucesso')
    res.status(200).json({ message: 'Funcionario excluído com sucesso', resultado });
  });
};

const listarFuncionarios = (req, res) => {
  FuncionarioModel.listarFuncionarios((err, resultado) => {
    if (err) {
      console.error('Erro ao listar os Funcionarios:', err);
      return res.status(500).json({ error: 'Erro ao listar os Funcionarios' });
    }
    res.status(200).json(resultado);
  });
};

const buscarFuncionarioPorId = (req, res) => {
  const { id } = req.params;
  FuncionarioModel.buscarFuncionarioPorId(id, (err, resultado) => {
    if (err) {
      console.error('Erro ao listar os Funcionarios:', err);
      return res.status(500).json({ error: 'Erro ao listar os Funcionarios' });
    }
    res.status(200).json({ message: 'Funcionario encontrado', resultado });

  });
};


module.exports = { adicionaFuncionario, atualizarFuncionario, excluirFuncionario, listarFuncionarios, buscarFuncionarioPorId };