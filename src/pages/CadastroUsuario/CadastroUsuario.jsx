import React, { useState, useContext } from 'react'
import { AutenticacaoContext } from '../../Contexts/Autenticacao';
import "./CadastroUsuario.css";
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'
import Botao from '../../components/Botao';
import Texto from '../../components/Texto';
import Input from '../../components/Input';



function CadastroUsuario() {

  const { logout } = useContext(AutenticacaoContext)

  const { CadastroUsuario } = useContext(AutenticacaoContext)

  const navigate = useNavigate();

  const [usuario, setUsuario] = useState("");

  const [formState, setFormState] = useState(
    //usar essa forma para o tcc
    {
      nome: "",
      email: "",
      senha: "", //sao chaves que recebem valor
      senha2: "",
      campo: "",
    }
  );
  const mudaFormState = (evento, chave) => {
    //usar essa forma para o tcc
    setFormState({
      ...formState,
      [chave]: evento.target.value,
    });
  };

  const verificaRegister = (evento) => {
    evento.preventDefault();
    console.log(formState);
    // Verifica se todos os campos foram preenchidos
    if (!formState.nome || !formState.email || !formState.senha || !formState.senha2 || !formState.campo) {
      alert("Todos os campos são obrigatórios!");
      return;
    }

    // Verifica se a senha e a confirmação de senha são iguais
    if (formState.senha !== formState.senha2) {
      alert("A senhas devem ser iguais!");
      return;
    }

    CadastroUsuario(formState);
    setFormState({
      nome: "",
      email: "",
      senha: "",
      senha2: "",
      campo: "",
    })
  };


  return (
    <>
      <main>
        <div className="container">
          <div className="quadro">
            <Texto texto="Crie sua Conta" corTexto="black" />
            <form
              method="POST"
              className="formulario"
              onSubmit={verificaRegister}
            >
              <Input
                tipo="name"
                placeholder="Nome"
                valor={formState.nome}
                onChange={(evento) => mudaFormState(evento, "nome")}
              />
              <Input
                tipo="email"
                placeholder="Email"
                valor={formState.email}
                onChange={(evento) => mudaFormState(evento, "email")}
              />
              <Input
                tipo="password"
                placeholder="senha"
                valor={formState.senha}
                onChange={(evento) => mudaFormState(evento, "senha")}
              />
              <Input
                tipo="password"
                placeholder="Confirme sua senha"
                valor={formState.senha2}
                onChange={(evento) => mudaFormState(evento, "senha2")}
              />
              <select class="form-control" aria-label=".form-select-lg example" value={formState.campo}
                onChange={(evento) => mudaFormState(evento, "campo")}>
                <option selected>Cargo</option>
                <option value="1">Secretário</option>
                <option value="2">Engenheiro</option>
                <option value="3">Prefeito</option>
              </select>
              <br></br>
              <Botao onClick={verificaRegister} texto="cadastrar" corTexto="white" />


              <button className="btn btn-link" onClick={logout}> Já possui conta? </button>


            </form>
          </div>
        </div>
      </main>
    </>
  );
}
export default CadastroUsuario;
