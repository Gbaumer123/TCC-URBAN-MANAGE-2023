//AtividadeController
const AtividadeModel = require ('../../models/atividadeModel/atividadeModel')

//rota para adicionar Atividade
const adicionaAtividade = (req, res) => {

    const { titulo,veiculo,descricao,equipe,funcionarios,status} = req.body
  
    AtividadeModel.adicionaAtividade(titulo,veiculo,descricao,equipe,funcionarios,status ,(err, resultado) => {
      if (err) {
        console.error('Erro ao salvar o Atividade:', err);
        return res.status(500).json({ error: 'Atividade ja cadastrada' });
      } else {
        console.log('Atividade cadastrada com sucesso')
        res.status(201).json({ result: 'Atividade salva com sucesso', resultado });
      }
    });
  };
  
  const atualizarAtividade = (req, res) => {
    const { id, titulo,veiculo,descricao,equipe,funcionarios } = req.body;
  
    AtividadeModel.atualizarAtividade(id, titulo,veiculo,descricao,equipe,funcionarios, (err, resultado) => {
      if (err) {
        console.error('Erro ao atualizar a Atividade:', err);
        return res.status(500).json({ error: 'Erro ao atualizar a Atividade' });
      }
      console.log('Atividade atualizada com sucesso')
      res.status(200).json({ message: 'Atividade atualizada com sucesso', resultado });
    })
  };
  
  const excluirAtividade = (req, res) => {
    const { id } = req.params;
  
    AtividadeModel.excluirAtividade(id, (err, resultado) => {
      if (err) {
        console.error('Erro ao excluir a Atividade:', err);
        return res.status(500).json({ error: 'Erro ao excluir a Atividade' });
      }
      console.log('Atividade  excluida com sucesso')
      res.status(200).json({ message: 'Atividade excluída com sucesso', resultado });
    });
  };
  
  const listarAtividades = (req, res) => {
    AtividadeModel.listarAtividades((err, resultado) => {
      if (err) {
        console.error('Erro ao listar as Atividades:', err);
        return res.status(500).json({ error: 'Erro ao listar as Atividades' });
      }
      res.status(200).json(resultado);
    });
  };
  
  const buscarAtividadePorId = (req, res) => {
    const { id } = req.params;
    AtividadeModel.buscarAtividadePorId(id, (err, resultado) => {
      if (err) {
        console.error('Erro ao listar as Atividades:', err);
        return res.status(500).json({ error: 'Erro ao listar as Atividades' });
      }
      res.status(200).json({ message: 'Atividade encontrada', resultado });
  
    });
  };

  
  
  
  module.exports = { adicionaAtividade, atualizarAtividade, excluirAtividade, listarAtividades ,buscarAtividadePorId};
  