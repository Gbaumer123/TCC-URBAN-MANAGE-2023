import express from "express";
import { conexao } from "../conexaoBanco.js";

const router = express.Router()

const getUsers = (_, res) => {
    const q = "SELECT * FROM usuarios";

    conexao.query(q, (err, data) =>{
        if (err) return res.json(err);

        return res.status(200).json(data)
    });
};

router.get("/", getUsers)

export const addUser = (req, res) => {
    console.log('Dados recebidos do formulário:', req.body);
  
      
      const values = [
        req.body.nome,
        req.body.email,
        req.body.senha,
        req.body.campo,
      ];
  
      const q =
        "INSERT INTO usuarios(nome, email, senha, campo) VALUES('"+req.body.nome+"', '"+req.body.email+"', '"+req.body.senha+"','"+req.body.campo+"')";
        
      console.log('Dados enviados do formulário:', q);
      conexao.query(q, values, (err) => {
        if (err) return res.json(err);
    
        return res.status(200).json("Usuário criado com sucesso.");
      });
    };
    router.post("/cadastro", addUser)
  
  export default router