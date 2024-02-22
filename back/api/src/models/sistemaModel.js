// produtoModel.js
const { connection } = require('../config');

class SistemaModel {
  static adicionaUsuario(nome, email, senha, campo, callback) {
    const query = 'INSERT INTO usuarios (nome, email, senha, campo) VALUES (?, ?, ?, ?)';
    connection.query(query, [nome, email, senha, campo], (err, results) => {
      if (err) {
        return callback(err, null);
      }
      callback(null, results);
    });
  }

  static buscarUsuarioPorId(idusuarios, callback) {
    const query = 'SELECT * FROM usuarios where idusuarios = ?';
    connection.query(query, [idusuarios], (err, results) => {
      if (err) {
        return callback(err, null);
      }
      if (results.length === 0) {
        return callback(null, null);
      }
      callback(null, results);
    })
  }

  static atualizarUsuario(idusuarios, nome, email, senha, campo, callback) {
    const query = 'UPDATE usuarios SET nome=?, email=?, senha=?, campo=? WHERE idusuarios=?';
    connection.query(query, [nome, email, senha, campo, idusuarios], (err, results) => {
      if (err) {
        return callback(err, null);
      }
      callback(null, results);
    });
  }

  static excluirUsuario(idusuarios, callback) {
    const query = 'DELETE FROM usuarios WHERE idusuarios=?';
    connection.query(query, [idusuarios], (err, results) => {
      if (err) {
        return callback(err, null);
      }
      callback(null, results);
    });
  }

  static listarUsuarios(callback) {
    const query = 'SELECT * FROM usuarios';
    connection.query(query, (err, results) => {
      if (err) {
        return callback(err, null);
      }
      callback(null, results);
    });
  }
  


}



module.exports = SistemaModel;
/*
// Outros métodos, como atualizarProduto, excluirProduto, listarProdutos, etc.
static buscarProdutoPorId(id, callback) {
  const query = 'SELECT * FROM produto WHERE id = ?';
  connection.query(query, [id], (err, results) => {
    if (err) {
      return callback(err, null);
    }
    if (results.length === 0) {
      return callback(null, null); // Produto não encontrado
    }
    callback(null, results[0]);
  });
}

static atualizarProduto(id, nome, preco, qtd, callback) {
  const query = 'UPDATE produto SET Nome=?, Preco=?, Quantidade=? WHERE id=?';
  connection.query(query, [nome, preco, qtd, id], (err, results) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, results);
  });
}

static excluirProduto(id, callback) {
  const query = 'DELETE FROM produto WHERE id=?';
  connection.query(query, [id], (err, results) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, results);
  });
}

static listarProdutos(callback) {
  const query = 'SELECT * FROM produto';
  connection.query(query, (err, results) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, results);
  });
}
 }*/


