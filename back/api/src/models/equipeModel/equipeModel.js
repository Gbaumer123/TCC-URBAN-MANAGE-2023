// EquipeModel.js
const { connection } = require('../../config');

class EquipeModel {
  static adicionaEquipe(nomeEquipe, callback) {
    const query = 'INSERT INTO equipes (nomeEquipe) VALUES (?)';
    connection.query(query, [nomeEquipe], (err, results) => {
      if (err) {
        return callback(err, null);
      }
      callback(null, results);
    });
  }

  static buscarEquipePorId(id, callback) {
    const query = 'SELECT * FROM equipes where id = ?';
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

  static atualizarEquipe(id, nomeEquipe, callback) {
    const query = 'UPDATE equipes SET nomeEquipe=? WHERE id=?';
    connection.query(query, [nomeEquipe, id], (err, results) => {
      if (err) {
        return callback(err, null);
      }
      callback(null, results);
    });
  }

  static excluirEquipe(id, callback) {
    const query = 'DELETE FROM equipes WHERE id=?';
    console.log(id)
    connection.query(query, [id], (err, results) => {
      if (err) {
        return callback(err, null);
      }
      callback(null, results);
    });
  }

  static listarEquipes(callback) {
    const query = 'SELECT * FROM equipes';
    connection.query(query, (err, results) => {
      if (err) {
        return callback(err, null);
      }
      callback(null, results);
    });
  }

  
  }

module.exports = EquipeModel;

