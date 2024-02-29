// veiculoModel.js
const { connection } = require('../../config');

class VeiculoModel {
  static adicionaVeiculo(nomeVeiculo, placa, renavam, callback) {
    const query = 'INSERT INTO veiculos (nomeVeiculo, placa, renavam) VALUES (?, ?, ?)';
    connection.query(query, [nomeVeiculo, placa, renavam], (err, results) => {
      if (err) {
        return callback(err, null);
      }
      callback(null, results);
    });
  }

  static buscarVeiculoPorId(idveiculos, callback) {
    const query = 'SELECT * FROM veiculos where idveiculos = ?';
    connection.query(query, [idveiculos], (err, results) => {
      if (err) {
        return callback(err, null);
      }
      if (results.length === 0) {
        return callback(null, null);
      }
      callback(null, results);
    })
  }

  static atualizarVeiculo(idveiculos,nomeVeiculo, placa, renavam, callback) {
    const query = 'UPDATE veiculos SET nomeVeiculo=?, placa=?, renavam=? WHERE idveiculos=?';
    connection.query(query, [nomeVeiculo, placa, renavam, idveiculos], (err, results) => {
      if (err) {
        return callback(err, null);
      }
      callback(null, results);
    });                                            
  }

  static excluirVeiculo(idveiculos, callback) {
    const query = 'DELETE FROM veiculos WHERE idveiculos=?';
    console.log(idveiculos)
    connection.query(query, [idveiculos], (err, results) => {
      if (err) {
        return callback(err, null);
      }
      callback(null, results);
    });
  }

  static listarVeiculos(callback) {
    const query = 'SELECT * FROM veiculos';
    connection.query(query, (err, results) => {
      if (err) {
        return callback(err, null);
      }
      callback(null, results);
    });
  }
  


}



module.exports = VeiculoModel;


