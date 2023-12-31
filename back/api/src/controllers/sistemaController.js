// produtoController.js
const SistemaModel = require('../models/sistemaModel');


//rota para adicionar usuario
const addUser = (req, res) => {

  const { nome, email, senha, campo } = req.body

  SistemaModel.addUser(nome, email, senha, campo, (err, result) => {
    if (err) {
      console.error('Erro ao salvar o usuario:', err);
      return res.status(500).json({ error: 'Usuario ja cadastrado' });
    } else {
      res.status(201).json({ result: 'Usuário salvo com sucesso', result});
    }
  });
};

module.exports = {addUser};
/*//Rota para verificação de login
exports.verificaLogin = (req, res) => {
  const { nome,senha } = req.body

  //consulta no banco de dados
  if (err) {
    console.error(err);
    return res.status(500).json({ err: "Erro interno do servidor" });
  }
  // Verifique se a consulta retornou algum resultado 
  if (results.length === 0) {
    // se for  = 0 Credenciais inválidas
    return res.status(401).json({ err: "Credendiciais invalidas" })
  }
  else {
    // Credenciais válidas
    return res.status(200).json({ success: "Login bem-sucedido" });
  }
  

}

exports.addFuncionario = (req, res) => {
  

  const { nomeFuncionario, cargo } = req.body

  const sql =
    "INSERT INTO funcionarios(nomeFuncionario, cargo) VALUES (?,?)";

    db.query(sql, [nomeFuncionario, cargo], (err, result) => {
      if (err) {
        res.status(400).json({ error: err.message });
      } else {
        res.status(201).json({ id: result.insertId, nomeFuncionario, cargo });
      }
    });
  };
 
   /* console.log('Dados enviados do formulário:', w);
  conexao.query(w, valuesFuncionario, (err) => {
    if (err) return res.json(err);

    return res.status(200).json("Funcionário criado com sucesso.");
  });
};
router.post("/CadastroFuncionario", addFuncionario)


const q =
    "INSERT INTO usuarios(nome, email, senha, campo) VALUES ('" + req.body.nome + "', '" + req.body.email + "', '" + req.body.senha + "','" + req.body.campo + "')";

  console.log('Dados enviados do formulário:', q);
  conexao.query(q, values, (err) => {
    if (err) return res.json(err);

    return res.status(200).json("Usuário criado com sucesso.");
  });
};
router.post("/cadastro", addUser)


exports.createProduto = (req, res) => {
  const { nome, preco, quantidade } = req.body;
  const sql = 'INSERT INTO produto (Nome, Preco, Quantidade) VALUES (?, ?, ?)';
  db.query(sql, [nome, preco, quantidade], (err, result) => {
    if (err) {
      res.status(400).json({ error: err.message });
    } else {
      res.status(201).json({ id: result.insertId, nome, preco, quantidade });
    }
  });
};

exports.getProdutos = (req, res) => {
  const sql = 'SELECT * FROM produto';
  db.query(sql, (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(200).json(results);
    }
  });
};
*/
// Resto dos métodos CRUD (getProdutoById, updateProduto, deleteProduto) similarmente adaptados para MySQL.



