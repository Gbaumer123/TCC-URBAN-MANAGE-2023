//AtividadeModel
const { connection } = require('../../config');

class AtividadeModel {
  static adicionaAtividade(titulo,veiculo,descricao,equipe,funcionarios, status, callback) {
    const query = 'INSERT INTO atividades (titulo,veiculo,descricao,equipe,funcionarios, status) VALUES (?,?,?,?,?, ?)';
    connection.query(query, [titulo,veiculo,descricao,equipe,funcionarios, status], (err, results) => {
      if (err) {
        return callback(err, null);
      }
      callback(null, results);
    });
  }

  static buscarAtividadePorId(id, callback) {
    const query = 'SELECT * FROM atividades where id = ?';
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

  static atualizarAtividade(id, titulo,veiculo,descricao,equipe,funcionarios, callback) {
    const query = 'UPDATE atividades SET titulo=?, veiculo=?, descricao=?,equipe,funcionarios WHERE id=?';
    connection.query(query, [titulo,veiculo,descricao,equipe,funcionarios, id], (err, results) => {
      if (err) {
        return callback(err, null);
      }
      callback(null, results);
    });
  }

  static excluirAtividade(id, callback) {
    const query = 'DELETE FROM atividades WHERE id=?';
    console.log(id)
    connection.query(query, [id], (err, results) => {
      if (err) {
        return callback(err, null);
      }
      callback(null, results);
    });
  }

  static listarAtividades(callback) {
    const query = 'SELECT * FROM atividades';
    connection.query(query, (err, results) => {
      if (err) {
        return callback(err, null);
      }
      callback(null, results);
    });
  }


  
  }

module.exports = AtividadeModel;

