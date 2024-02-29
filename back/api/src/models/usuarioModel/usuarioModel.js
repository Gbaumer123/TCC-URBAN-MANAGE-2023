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
    console.log(idusuarios)
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

module.exports = UsuarioModel;

