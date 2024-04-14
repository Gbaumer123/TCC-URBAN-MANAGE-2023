// EquiFuncModel.js
const { connection } = require('../../config');

class EquiFuncModel {

    static listaFuncionarioEquipe(callback) {
        const query = 'SELECT * FROM equipes_funcionarios';
        connection.query(query, (err, results) => {
          if (err) {
            return callback(err, null);
          }
          callback(null, results);
        });
      }

  static vincularFuncionarioEquipe = async (idFuncionario, idEquipe) => {
    try {
      const query = `INSERT INTO equipes_funcionarios (idFuncionario, idEquipe) VALUES (?, ?)`;
      await connection.query(query, [idFuncionario, idEquipe]);
      console.log('Funcionário vinculado à equipe com sucesso');
    } catch (error) {
      console.error('Erro ao vincular funcionário à equipe:', error.message);
      throw error;
    }
  };
}

module.exports = EquiFuncModel;