import React, { useState, useContext } from 'react';
import './RecuperaCodigo.css';
import { AutenticacaoContext } from '../../Contexts/Autenticacao';
import Input from '../../components/Input';
import Textomenor from '../../components/Textomenor';
import Botao from '../../components/Botao';
import { useNavigate } from 'react-router-dom';

const RecuperaCodigo = () => {
  const { logout } = useContext(AutenticacaoContext);
  const navigate = useNavigate();

  const [formState, setFormState] = useState({
    codigo: '',
    digit1: '',
    digit2: '',
    digit3: '',
    digit4: '',
    digit5: '',
    digit6: '',
  });

  const mudaFormState = (evento, chave) => {
    setFormState({
      ...formState,
      [chave]: evento.target.value,
    });
  };

  return (
    <body>
      <main className='fundoDesfocado'>
        <div className='imagemLateral'></div>
        <section className='lateral'>
          <form method='POST' className='formalt'>
            <article className='gap-input'>
              <Textomenor texto='Digite o código enviado ao seu email:' />
              <div className="seis-quadrados">
                <Input
                  tipo="number"
                  valor={formState.digit1}
                  onChange={(evento) => mudaFormState(evento, "digit1")}
                />
                <Input
                  tipo="number"
                  valor={formState.digit2}
                  onChange={(evento) => mudaFormState(evento, "digit2")}
                />
                <Input
                  tipo="number"
                  valor={formState.digit3}
                  onChange={(evento) => mudaFormState(evento, "digit3")}
                />
                <Input
                  tipo="number"
                  valor={formState.digit4}
                  onChange={(evento) => mudaFormState(evento, "digit4")}
                />
                <Input
                  tipo="number"
                  valor={formState.digit5}
                  onChange={(evento) => mudaFormState(evento, "digit5")}
                />
                <Input
                  tipo="number"
                  valor={formState.digit6}
                  onChange={(evento) => mudaFormState(evento, "digit6")}
                />
              </div>
              <Botao onClick={() => navigate('/AlteraSenha')} texto="ENVIAR" />
            </article>
          </form>
          <a className="voltar" onClick={logout}> Voltar </a>
        </section>
        </main>
      </body>
   
  );
};

export default RecuperaCodigo;
