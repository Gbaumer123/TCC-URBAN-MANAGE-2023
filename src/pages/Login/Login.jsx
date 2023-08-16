import React, { useState, useContext, useEffect } from 'react';
import { AutenticacaoContext } from '../../Contexts/Autenticacao';
import './Login.css';
import { useNavigate } from 'react-router-dom';
import Botao from '../../components/Botao';
import Texto from '../../components/Texto';
import Input from '../../components/Input';

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
          {/*<div className='quadro'> </div>*/}
          
          <body className='fundoDesfocado'>
          <div className='imagemLateral'></div>
          <section className='lateral'>
            <Texto texto='FAÇA LOGIN' />
            
            <form method='POST' className='formulario'>
            <article className='gap-input'>
              <Input
                tipo='name'
                placeholder='Usuario'
                valor={formState.nomeUsuario}
                onChange={(evento) => mudaFormState(evento, 'nomeUsuario')}
              />
              <Input
                tipo='password'
                placeholder='senha'
                valor={formState.senhaLogin}
                onChange={(evento) => mudaFormState(evento, 'senhaLogin')}
              />
               
              </article>
              {usuarioEncontrado ? (
                <h1></h1>
              ) : (
                <p></p>
              )}
              <article className='form-group'>
                <input
                  className='form-check-input'
                  type='checkbox'
                  id='lembrarUsuario'
                  checked={formState.lembrarUsuario}
                  onChange={(evento) =>
                    mudaFormState(evento, 'lembrarUsuario')
                  }
                />
                <label className='form-check-label' htmlFor='lembrarUsuario'>
                  Lembrar usuário
                </label>
              </article>

              <a className='spanSenha' onClick={() => navigate('/RecuperaSenha')}>Esqueceu sua senha?</a>

              
              <Botao onClick={verificaLogin} texto="Entrar" corTexto="white" />
              <br></br><br></br>
              <p className='nao-tem-conta'>Não tem uma CONTA?
                <a className='Cadastrar' onClick={() => navigate('/cadastro')}>Cadastre-se</a>
              </p>
            </form>
          
          </section>
          </body>
       
      </main>
    </>
  );
}

export default Login