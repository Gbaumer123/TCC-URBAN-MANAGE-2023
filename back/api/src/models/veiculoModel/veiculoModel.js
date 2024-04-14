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

  static buscarVeiculoPorId(id, callback) {
    const query = 'SELECT * FROM veiculos where id = ?';
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

  static atualizarVeiculo(id,nomeVeiculo, placa, renavam, callback) {
    const query = 'UPDATE veiculos SET nomeVeiculo=?, placa=?, renavam=? WHERE id=?';
    connection.query(query, [nomeVeiculo, placa, renavam, id], (err, results) => {
      if (err) {
        return callback(err, null);
      }
      callback(null, results);
    });                                            
  }

  static excluirVeiculo(id, callback) {
    const query = 'DELETE FROM veiculos WHERE id=?';
    console.log(id)
    connection.query(query, [id], (err, results) => {
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


