// funcionarioModel.js
const { connection } = require('../../config');

class FuncionarioModel {

  static async adicionaFuncionario(nomeFuncionario, cargo, equipe) {
    try {
      const [result] = await connection.execute('INSERT INTO funcionarios (nomeFuncionario, cargo, equipe) VALUES (?, ?, ?)', [nomeFuncionario, cargo, equipe]);

      if (result && result.insertId) {
        return result.insertId;
      } else {
        throw new Error('Nenhum ID de funcionário retornado após a inserção.');
      }
    } catch (error) {
      throw error;
    }
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
  


}

module.exports = FuncionarioModel;

