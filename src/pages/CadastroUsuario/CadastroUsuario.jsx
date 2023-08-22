import React, { useState, useContext } from 'react'
import { AutenticacaoContext } from '../../Contexts/Autenticacao';
import "./CadastroUsuario.css";
import { useNavigate } from 'react-router-dom';
import Botao from '../../components/Botao';
import Textomaior from '../../components/Textomaior';
import Input from '../../components/Input';
import Textomenor from '../../components/Textomenor';



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
        <body className='fundoDesfocado'>
          <div className='imagemLateral'></div>


          <section className='lateral'>
            <Textomaior texto="Crie sua Conta" />
            <form method="POST" className="form-cad">


              <Textomenor texto='Nome do usuário:' />
              <Input
                tipo="name"
                placeholder="Usuário"
                valor={formState.nome}
                onChange={(evento) => mudaFormState(evento, "nome")}
                icone='usuario'
              />
              <Textomenor texto='Email:' />
              <Input
                tipo="email"
                placeholder="Email"
                valor={formState.email}
                onChange={(evento) => mudaFormState(evento, "email")}
                icone='email'
              />
              <Textomenor texto='Senha:' />
              <Input
                tipo="password"
                placeholder="senha"
                valor={formState.senha}
                onChange={(evento) => mudaFormState(evento, "senha")}
                icone='senha'
              />
              <Textomenor texto='Confirme sua senha:' />
              <Input
                tipo="password"
                placeholder="Confirme sua senha"
                valor={formState.senha2}
                onChange={(evento) => mudaFormState(evento, "senha2")}
                icone='senha'
              />

              <Textomenor texto='Cargo:' />
              <article className='gap-input-cad'>
                <select class="select" value={formState.campo}
                  onChange={(evento) => mudaFormState(evento, "campo")}>
                  <option selected >Cargo</option>
                  <option value="1">Secretário</option>
                  <option value="2">Engenheiro</option>
                  <option value="3">Prefeito</option>
                </select>

                <Botao onClick={verificaRegister} texto="CADASTRAR" />

                <a className="japossuiconta" onClick={logout}> Já possui conta? </a>
              </article>
            </form>

          </section>
        </body>
      </main>
    </>
  );
}
export default CadastroUsuario;
