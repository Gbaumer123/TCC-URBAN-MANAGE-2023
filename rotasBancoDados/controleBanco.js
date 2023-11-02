import express from "express";
import { conexao } from "../conexaoBanco.js";

const router = express.Router()

//rota para adicionar usuario
const addUser = (req, res) => {
  console.log('Dados recebidos do formulário:', req.body);


  const values = [
    req.body.nome,
    req.body.email,
    req.body.senha,
    req.body.campo,
  ];

  const q =
    "INSERT INTO usuarios(nome, email, senha, campo) VALUES ('" + req.body.nome + "', '" + req.body.email + "', '" + req.body.senha + "','" + req.body.campo + "')";

  console.log('Dados enviados do formulário:', q);
  conexao.query(q, values, (err) => {
    if (err) return res.json(err);

    return res.status(200).json("Usuário criado com sucesso.");
  });
};
router.post("/cadastro", addUser)

//Rota para verificação de login
const verificaLogin = (req, res) => {
  const values = [
      req.body.nome,
      req.body.senha,
  ]

  //consulta no banco de dados
  const q = "SELECT * FROM usuarios WHERE nome = '"+req.body.nome+"' AND senha ='"+req.body.senha+"'";
  console.log(q);
  //executa a consulta
  conexao.query(q, values, (err, results) => {
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

  });
  
}
router.post("/", verificaLogin)




const addFuncionario = (req, res) => {
  console.log('Dados recebidos do formulário:', req.body);


  const valuesFuncionario = [
    req.body.nomeFuncionario,
    req.body.cargo,
  ];

  const w =
    "INSERT INTO funcionarios(nomeFuncionario, cargo) VALUES ('" + req.body.nomeFuncionario + "', '" + req.body.cargo + "')";

 
  console.log('Dados enviados do formulário:', w);
  conexao.query(w, valuesFuncionario, (err) => {
    if (err) return res.json(err);

    return res.status(200).json("Funcionário criado com sucesso.");
  });
};
router.post("/CadastroFuncionario", addFuncionario)

export default router