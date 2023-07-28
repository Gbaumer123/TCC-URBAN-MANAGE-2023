import React, { useState, useContext, useEffect } from 'react';
import { AutenticacaoContext } from '../../Contexts/Autenticacao';
import './Login.css';
import 'bootstrap/dist/css/bootstrap.min.css';
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
        <div className='container'>
          <div className='quadro'>
            <Texto texto='Faça seu Login' corTexto='black' />
            <form method='POST' className='formulario'>
              <div className='gap-input'>
              <Input
                className='form-control'
                tipo='name'
                placeholder='Usuario'
                valor={formState.nomeUsuario}
                onChange={(evento) => mudaFormState(evento, 'nomeUsuario')}
              />
              <Input
                className='form-control'
                tipo='password'
                placeholder='senha'
                valor={formState.senhaLogin}
                onChange={(evento) => mudaFormState(evento, 'senhaLogin')}
              />
              </div>
              {usuarioEncontrado ? (
                <h1></h1>
              ) : (
                <p></p>
              )}
              <div className='form-group'>
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
              </div>

              <a className='spanSenha' onClick={() => navigate('/RecuperaSenha')}>Esqueceu sua senha?</a>

              
              <Botao onClick={verificaLogin} texto="Entrar" corTexto="white" />
              <br></br><br></br>
              <p className='nao-tem-conta'>Não tem uma conta?
                <a className='Cadastrar' onClick={() => navigate('/cadastro')}>Cadastre-se</a>
              </p>
            </form>
          </div>
        </div>
      </main>
    </>
  );
}

export default Login