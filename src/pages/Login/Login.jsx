import React, { useState, useContext, useEffect } from 'react';
import { AutenticacaoContext } from '../../Contexts/Autenticacao';
import './Login.css';
import { useNavigate } from 'react-router-dom';
import Botao from '../../components/Botao';
import Textomaior from '../../components/Textomaior';
import Input from '../../components/Input';
import Textomenor from '../../components/Textomenor';



function Login() {
  const navigate = useNavigate();
  const { login } = useContext(AutenticacaoContext);

  const [formState, setFormState] = useState({
    nomeUsuario: '',
    senhaLogin: '',
    lembrarUsuario: false,
  });


  const mudaFormState = (evento, chave) => {
    setFormState({
      ...formState,
      [chave]: evento.target.value,
    });
  };


  const [usuarioEncontrado, setUsuarioEncontrado] = useState(true);
  const verificaLogin = (evento) => {
    evento.preventDefault();
    const usuarioEncontrado = login(formState.nomeUsuario, formState.senhaLogin);
    setUsuarioEncontrado(usuarioEncontrado);
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
                  onChange={(evento) => mudaFormState(evento, 'nomeUsuario')}
                  icone='usuario'

                />

                <Input
                  tipo='password'
                  placeholder='Senha'
                  valor={formState.senhaLogin}
                  onChange={(evento) => mudaFormState(evento, 'senhaLogin')}
                  icone='senha'
                />
              </article>
              
              {usuarioEncontrado ? (
                <h1></h1>
              ) : (
                <p></p>
              )}
             
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


              <Botao onClick={verificaLogin} texto="ENTRAR"/>
              
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