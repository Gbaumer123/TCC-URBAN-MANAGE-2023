import React, { useState, useContext } from 'react';
import './AlteraSenha.css';
import { AutenticacaoContext } from '../../Contexts/Autenticacao';
import Input from '../../components/Input';
import Textomenor from '../../components/Textomenor';
import Botao from '../../components/Botao';
import { useNavigate } from 'react-router-dom';


const AlteraSenha = () => {
    const { logout } = useContext(AutenticacaoContext);
    const navigate = useNavigate();

    const [formState, setFormState] = useState({
        NovaSenha: '',
        ConfirmaSenha: '',
    });

    const mudaFormState = (evento, chave) => {
        setFormState({
            ...formState,
            [chave]: evento.target.value,
        });
    };

    const [mostrarSenha, setMostrarSenha] = useState(false);

    const MostrarSenha = () => {
        setMostrarSenha(!mostrarSenha);
    };

    return (
        <main>
            <body className='fundoDesfocado'>
                <div className='imagemLateral'></div>
                <section className='lateral'>
                    <form method='POST' className='formalt'>

                        <Textomenor texto='REDEFINA SUA SENHA' />

                        <article className='gap-input-alt'>
                            <div style={{ marginBottom: '25px' }}/> 


                            <Input
                                tipo={mostrarSenha ? 'text' : 'password'}
                                valor={formState.NovaSenha}
                                placeholder={'Digite sua nova senha'}
                                onChange={(evento) => mudaFormState(evento, "NovaSenha")}
                                icone={'senha'}
                            />
                           <div className='form-check'> 
                                <input type="checkbox" onChange={MostrarSenha} className='form-check-input' />
                                <label >Mostrar senha</label>
                            </div>

                            <Input
                                tipo={mostrarSenha ? 'text' : 'password'}
                                valor={formState.ConfirmaSenha}
                                placeholder={'Confirme sua nova senha'}
                                onChange={(evento) => mudaFormState(evento, "ConfirmaSenha")}
                                icone={'senha'}
                            />
                            <div className='form-check'> 
                                <input type="checkbox" onChange={MostrarSenha} className='form-check-input' />
                                <label >Mostrar senha</label>
                            </div>

                            <Botao onClick={() => navigate('/')} texto="REDEFINIR" />
                        </article>
                    </form>
                    <a className="voltar" onClick={logout}> Voltar </a>
                </section>
            </body>
        </main >
    );
};

export default AlteraSenha;