// funcionarioModel.js
const { connection } = require('../../config');

class FuncionarioModel {
  static adicionaFuncionario(nomeFuncionario, cargo, equipe, callback) {
    const query = 'INSERT INTO funcionarios (nomeFuncionario, cargo, equipe) VALUES (?, ?, ?)';
    connection.query(query, [nomeFuncionario, cargo, equipe], (err, results) => {
      if (err) {
        return callback(err, null);
      }
      callback(null, results);
    });
  }

  static buscarFuncionarioPorId(id, callback) {
    const query = 'SELECT * FROM funcionarios where id = ?';
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
  

  static atualizarFuncionario(id, nomeFuncionario, cargo, equipe, callback) {
    const query = 'UPDATE funcionarios SET nomeFuncionario=?, cargo = ?, equipe = ? WHERE id=?';
    connection.query(query, [nomeFuncionario, cargo, equipe, id], (err, results) => {
      if (err) {
        return callback(err, null);
      }
      callback(null, results);
    });                                            
  }

  static excluirFuncionario(id, callback) {
    const query = 'DELETE FROM funcionarios WHERE id=?';
    console.log(id)
    connection.query(query, [id], (err, results) => {
      if (err) {
        return callback(err, null);
      }
      callback(null, results);
    });
  }

  static listarFuncionarios(callback) {
    const query = 'SELECT * FROM funcionarios';
    connection.query(query, (err, results) => {
      if (err) {
        return callback(err, null);
      }
      callback(null, results);
    });
  }
  
  static async listarFuncionariosPorEquipe(id) {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM funcionarios WHERE equipe = ?';
      connection.query(query, [id], (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  }

}

module.exports = FuncionarioModel;

