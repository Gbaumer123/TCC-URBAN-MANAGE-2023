import React, { useState, useContext } from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';
import Botao from '../../components/Botao';
import Textomaior from '../../components/Textomaior';
import Input from '../../components/Input';
import Textomenor from '../../components/Textomenor';
import { AutenticacaoContext } from '../../Contexts/Autenticacao';



function Login() {
  const navigate = useNavigate();
  const { verificaLogin } = useContext(AutenticacaoContext);
  
  

  const [formState, setFormState] = useState({
    nome: '',
    senha: '',
    lembrarUsuario: false,
  });


  const mudaFormState = (evento, chave) => {
    setFormState({
      ...formState,
      [chave]: evento.target.value,
    });
  };



  const realizarLogin = async (evento) => {
    evento.preventDefault();


    try {
      // Aqui você envia uma solicitação post para o servidor com o nome e senha
      const resposta = await verificaLogin(formState.nome, formState.senha);
      console.log('solicitação enviada!');


      if (resposta.status === 200) {
        console.log("Login bem sucedido")
        //login sucedido
        navigate('/home');
      } else {
        //mensagem de erro
        alert("Credenciais inválidas. Tente novamente.")
      }
    } catch (err) {
      console.error("Erro fazer login:", err);

    }

  }

  return (
    <>
      <main>
        <body className='fundoDesfocado'>
          <div className='imagemLateral'></div>

          <section className='lateral'>
            <Textomaior texto='FAÇA LOGIN' />
            <form method='POST' className='form'>

              <article className='gap-input'>
                <Input

                  tipo='name'
                  placeholder='Usuario'
                  valor={formState.nomeUsuario}
                  onChange={(evento) => mudaFormState(evento, 'nome')}
                  icone='usuario'

                />

                <Input
                  tipo='password'
                  placeholder='Senha'
                  valor={formState.senha}
                  onChange={(evento) => mudaFormState(evento, 'senha')}
                  icone='senha'
                />
              </article>

              <input
                className='form-check-input'
                type='checkbox'
                checked={formState.lembrarUsuario}
                onChange={(evento) =>
                  mudaFormState(evento, 'lembrarUsuario')
                }
              />
              <Textomenor texto='Lembrar usuário' />

              <article className='gap-input'>
                <a className='spanSenha' onClick={() => navigate('/RecuperaSenha')}>Esqueceu sua senha?</a>


                <Botao onClick={realizarLogin} texto="ENTRAR" />

                <label className='nao-tem-conta'>Não tem uma conta?
                  <a className='Cadastrar' onClick={() => navigate('/cadastro')}>Cadastre-se</a>
                </label>
              </article>
            </form>

          </section>
        </body>

      </main>
    </>
  );
}


export default Login