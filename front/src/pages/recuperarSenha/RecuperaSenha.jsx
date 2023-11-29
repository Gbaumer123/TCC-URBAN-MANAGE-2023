import React, { useState, useContext } from 'react'
import './RecuperaSenha.css';
import { AutenticacaoContext } from '../../Contexts/Autenticacao';
import Input from '../../components/Input';
import Textomaior from '../../components/Textomaior';
import Textomenor from '../../components/Textomenor';
import Botao from '../../components/Botao';



const RecuperaSenha = () => {
  const { logout } = useContext(AutenticacaoContext)

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


  return (
    <main>
      <body className='fundoDesfocado'>
        <div className='imagemLateral'></div>
        <section className='lateral'>
          <Textomaior texto={'Recupere sua conta'}></Textomaior>
          <form method='POST' className='formalt'>
          <article className='gap-input-alt'>
          <Textomenor texto='Informe o e-mail associado à sua conta para alterar sua senha.'  />
            <Input
              tipo='email'
              placeholder='Email'
              valor={formState.senhaLogin}
              onChange={(evento) => mudaFormState(evento, 'senhaLogin')}
              icone='email'
            />
            <Textomenor texto='Um código de verificação de senha será enviado ao seu email' ></Textomenor>
            <Botao   texto="OBTER CÓDIGO"  />
            </article>
          </form>
          <a className="voltar" onClick={logout}> Voltar </a>
        </section>
        
      </body>

    </main>
  )
};


export default RecuperaSenha