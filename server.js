import cors from "cors";
import express from 'express';
import router from "./rotasBancoDados/controleBanco.js";
import { conexao } from "./conexaoBanco.js";


const app = express();
const port = process.env.PORT || 8800;

app.use(express.json())
app.use(cors())


conexao.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err);
  } else {
    console.log('Conexão bem-sucedida com o banco de dados');
  }
});
app.use("/", router)




app.listen(port, () => {
  console.log(`Servidor está executando na porta ${port}`);
});