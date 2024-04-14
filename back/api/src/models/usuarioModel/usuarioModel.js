// usuarioModel.js
const { connection } = require('../../config');

class UsuarioModel {
  static adicionaUsuario(nome, email, senha, campo, callback) {
    const query = 'INSERT INTO usuarios (nome, email, senha, campo) VALUES (?, ?, ?, ?)';
    connection.query(query, [nome, email, senha, campo], (err, results) => {
      if (err) {
        return callback(err, null);
      }
      callback(null, results);
    });
  }

  static buscarUsuarioPorId(id, callback) {
    const query = 'SELECT * FROM usuarios where id = ?';
    connection.query(query, [id], (err, results) => {
      if (err) {
        return callback(err, null);
      }
      if (results.length === 0) {
        return callback(null, null);
      }
      callback(null, results);
    })
  }

  static atualizarUsuario(id, nome, email, senha, campo, callback) {
    const query = 'UPDATE usuarios SET nome=?, email=?, senha=?, campo=? WHERE id=?';
    connection.query(query, [nome, email, senha, campo, id], (err, results) => {
      if (err) {
        return callback(err, null);
      }
      callback(null, results);
    });                                            
  }

  static excluirUsuario(id, callback) {
    const query = 'DELETE FROM usuarios WHERE id=?';
    console.log(id)
    connection.query(query, [id], (err, results) => {
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

module.exports = UsuarioModel;

