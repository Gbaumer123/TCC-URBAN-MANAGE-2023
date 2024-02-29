// usuarioController.js
const UsuarioModel = require('../../models/usuarioModel/usuarioModel');


//rota para adicionar usuario
const adicionaUsuario = (req, res) => {

  const { nome, email, senha, campo } = req.body

  UsuarioModel.adicionaUsuario(nome, email, senha, campo, (err, resultado) => {
    if (err) {
      console.error('Erro ao salvar o usuario:', err);
      return res.status(500).json({ error: 'Usuario ja cadastrado' });
    } else {
      console.log('Usuário cadastrado com sucesso')
      res.status(201).json({ result: 'Usuário salvo com sucesso', resultado });
    }
  });
};

const atualizarUsuario = (req, res) => {
  const { idusuarios, nome, email, senha, campo } = req.body;

  UsuarioModel.atualizarUsuario(idusuarios, nome, email, senha, campo, (err, resultado) => {
    if (err) {
      console.error('Erro ao atualizar o usuario:', err);
      return res.status(500).json({ error: 'Erro ao atualizar o usuario' });
    }
    console.log('Usuário atualizado com sucesso')
    res.status(200).json({ message: 'Usuario atualizado com sucesso', resultado });
  })
};

const excluirUsuario = (req, res) => {
  const { id } = req.params;

  UsuarioModel.excluirUsuario(id, (err, resultado) => {
    if (err) {
      console.error('Erro ao excluir o usuario:', err);
      return res.status(500).json({ error: 'Erro ao excluir o usuario' });
    }
    console.log('Usuário excluido com sucesso')
    res.status(200).json({ message: 'Usuario excluído com sucesso', resultado });
  });
};

const listarUsuarios = (req, res) => {
  UsuarioModel.listarUsuarios((err, resultado) => {
    if (err) {
      console.error('Erro ao listar os usuarios:', err);
      return res.status(500).json({ error: 'Erro ao listar os usuarios' });
    }
    res.status(200).json(resultado);
  });
};

const buscarUsuarioPorId = (req, res) => {
  const { id } = req.params;
  UsuarioModel.buscarUsuarioPorId(id, (err, resultado) => {
    if (err) {
      console.error('Erro ao listar os usuarios:', err);
      return res.status(500).json({ error: 'Erro ao listar os usuarios' });
    }
    res.status(200).json({ message: 'Usuario encontrado', resultado });

  });
};


module.exports = { adicionaUsuario, atualizarUsuario, excluirUsuario, listarUsuarios, buscarUsuarioPorId };



