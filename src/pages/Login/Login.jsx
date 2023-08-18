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
        <body className='fundoDesfocado'>
          <div className='imagemLateral'></div>
          
          <section className='lateral'>
          <Texto texto='FAÇA LOGIN' />
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
                  id='lembrarUsuario'
                  checked={formState.lembrarUsuario}
                  onChange={(evento) =>
                    mudaFormState(evento, 'lembrarUsuario')
                  }
                />
                <label className='lembraUsuario'>
                  Lembrar usuário
                </label>
             
                <article className='gap-input'>
              <a className='spanSenha' onClick={() => navigate('/RecuperaSenha')}>Esqueceu sua senha?</a>


              <Botao onClick={verificaLogin} texto="ENTRAR" corTexto="#FFED02" />
              
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