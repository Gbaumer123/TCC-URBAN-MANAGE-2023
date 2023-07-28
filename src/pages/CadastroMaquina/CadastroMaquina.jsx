import React, { useState } from 'react'
import Cabecalho from "../../components/Header/Cabecalho";
import Botao from "../../components/Botao";
import Input from "../../components/Input";
import Texto from '../../components/Texto';

const CadastroMaquina = () => {
    const [formState, setFormState] = useState(
        {
            nomeMaquina: "",
            placa: "", //sao chaves que recebem valor
        }
    );
    const mudaFormState = (evento, chave) => {
        //usar essa forma para o tcc
        setFormState({
            ...formState,
            [chave]: evento.target.value,
        });
    };

    const cadastraMaquina = (evento) => {
        evento.preventDefault();

        //manda o nome e cargo digitado para dentro do JSON
        const novaMaquina = {
            id: Date.now(),
            nomeMaquina: formState.nomeMaquina,
            placa: formState.placa,
        };
        // Recupera o array de maquinas do localStorage ou cria um novo array vazio
        const maquinasStorage = JSON.parse(localStorage.getItem("maquinas")) || [];

        /*verifica se é um array, Se for, ele atribui esse valor à variável 
        "maquinas", caso contrário, atribui um novo array vazio. */
        let maquinas = maquinasStorage;
        if (!Array.isArray(maquinas)) {
            maquinas = [];
        }

        //Adiciona a novo maquina no array
        maquinas.push(novaMaquina);


        // Salva o array atualizado no localStorage
        localStorage.setItem("maquinas", JSON.stringify(maquinas));

        // Exibe as informações da novo funcionario no console
        console.log(novaMaquina);

        setFormState({
            nomeMaquina: "",
            placa: "",
          })

    }

    return (
        <>
            <Cabecalho />
            <section className='d-flex justify-content-center align-items-center h-100'>
                <div className='form'>
                    <Texto texto="Adicione um nova máquina" corTexto="black" />
                    <form
                        method="POST"
                        className="text-center"
                    >
                        <Input
                            tipo="name"
                            placeholder="Nome da maquina"
                            valor={formState.nomeMaquina}
                            onChange={(evento) => mudaFormState(evento, "nomeMaquina")}
                        />
                        <Input
                            tipo="text"
                            placeholder="Placa"
                            valor={formState.placa}
                            onChange={(evento) => mudaFormState(evento, "placa")}
                        />
                        <br></br>

                        <Botao onClick={cadastraMaquina} texto="cadastrar" corTexto="white" />
                    </form>
                </div>
            </section>
        </>
    )
}

export default CadastroMaquina

