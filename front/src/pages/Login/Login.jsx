import React, { useState, useContext } from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';
import Botao from '../../components/Botao';
import Textomaior from '../../components/Textomaior';
import Input from '../../components/Input';
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

      } else {
        //mensagem de erro
        alert("Credenciais inválidas. Tente novamente.")
      }
    } catch (err) {
      console.error("Erro fazer login:", err);

    }
    navigate('/home');
  }

  const [mostrarSenha, setMostrarSenha] = useState(false);

    const MostrarSenha = () => {
        setMostrarSenha(!mostrarSenha);
    };

  return (
    <>
      <body>
        < main className='fundoDesfocado'>
          <div className='imagemLateral'></div>

          <section className='lateralLogin'>
            <Textomaior texto='FAÇA LOGIN' />
            <form method='POST' className='form'>

              <article className='gap-input-lo'>
                <Input

                  tipo='name'
                  placeholder='Usuario'
                  valor={formState.nomeUsuario}
                  onChange={(evento) => mudaFormState(evento, 'nome')}
                  icone='usuario'

                />

                <Input
                  tipo={mostrarSenha ? 'text' : 'password'}
                  placeholder='Senha'
                  valor={formState.senha}
                  onChange={(evento) => mudaFormState(evento, 'senha')}
                  icone='senha'
                />
              </article>

              <div className='form-check'>
                <input type="checkbox" onChange={MostrarSenha} className='form-check-input' />
                <label className='cor'>Mostrar senha</label>
              </div>

              <article className='gap-input'>
                <a className='spanSenha' onClick={() => navigate('/RecuperaSenha')}>Esqueceu sua senha?</a>
              </article>
              <div style={{ marginTop: '10px'}}></div>
              <Botao onClick={realizarLogin} texto="ENTRAR" />
            </form>

          </section>
          </main>
        </body>

    </>
  );
}


export default Login