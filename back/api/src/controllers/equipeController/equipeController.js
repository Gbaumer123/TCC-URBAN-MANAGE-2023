// EquipeController.js
const EquipeModel = require('../../models/equipeModel/equipeModel');

//rota para adicionar Equipe
const adicionaEquipe = (req, res) => {

  const { nomeEquipe } = req.body

  EquipeModel.adicionaEquipe(nomeEquipe, (err, resultado) => {
    if (err) {
      console.error('Erro ao salvar o Equipe:', err);
      return res.status(500).json({ error: 'Equipe ja cadastrada' });
    } else {
      console.log('Equipe  cadastrada com sucesso')
      res.status(201).json({ result: 'Equipe salva com sucesso', resultado });
    }
  });
};

const atualizarEquipe = (req, res) => {
  const { id, nomeEquipe } = req.body;

  EquipeModel.atualizarEquipe(id, nomeEquipe, (err, resultado) => {
    if (err) {
      console.error('Erro ao atualizar a Equipe:', err);
      return res.status(500).json({ error: 'Erro ao atualizar a Equipe' });
    }
    console.log('Equipe  atualizada com sucesso')
    res.status(200).json({ message: 'Equipe atualizada com sucesso', resultado });
  })
};

const excluirEquipe = (req, res) => {
  const { id } = req.params;

  EquipeModel.excluirEquipe(id, (err, resultado) => {
    if (err) {
      console.error('Erro ao excluir a Equipe:', err);
      return res.status(500).json({ error: 'Erro ao excluir a Equipe' });
    }
    console.log('Equipe  excluida com sucesso')
    res.status(200).json({ message: 'Equipe excluída com sucesso', resultado });
  });
};

const listarEquipes = (req, res) => {
  EquipeModel.listarEquipes((err, resultado) => {
    if (err) {
      console.error('Erro ao listar as Equipes:', err);
      return res.status(500).json({ error: 'Erro ao listar as Equipes' });
    }
    res.status(200).json(resultado);
  });
};

const buscarEquipePorId = (req, res) => {
  const { id } = req.params;
  EquipeModel.buscarEquipePorId(id, (err, resultado) => {
    if (err) {
      console.error('Erro ao listar as Equipes:', err);
      return res.status(500).json({ error: 'Erro ao listar as Equipes' });
    }
    res.status(200).json({ message: 'Equipe encontrada', resultado });

  });
};




module.exports = { adicionaEquipe, atualizarEquipe, excluirEquipe, listarEquipes, buscarEquipePorId};
