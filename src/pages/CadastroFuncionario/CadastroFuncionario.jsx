import React, { useState } from 'react'
import Cabecalho from "../../components/Header/Cabecalho";
import Botao from "../../components/Botao";
import Input from "../../components/Input";
import Texto from '../../components/Texto';

const CadastroFuncionario = () => {
    const [formState, setFormState] = useState({
        nomeFuncionario: "",
        cargo: "",
    });

    const mudaFormState = (evento, chave) => {
        setFormState({
            ...formState,
            [chave]: evento.target.value,
        });
    };

    const cadastraFuncionario = (evento) => {
        evento.preventDefault();
        const novoFuncionario = {
            id: Date.now(),
            nome: formState.nomeFuncionario,
            cargo: formState.cargo,
        };

        // Recupera o array de funcionarios do localStorage ou cria um novo array vazio
        const funcionariosStorage = JSON.parse(localStorage.getItem("funcionarios")) || [];

        /*verifica se é um array, Se for, ele atribui esse valor à variável 
        "funcionarios", caso contrário, atribui um novo array vazio. */
        let funcionarios = funcionariosStorage;
        if (!Array.isArray(funcionarios)) {
          funcionarios = [];
        }

        //Adiciona a novo funcionario no array
        funcionarios.push(novoFuncionario);
       

        // Salva o array atualizado no localStorage
        localStorage.setItem("funcionarios", JSON.stringify(funcionarios));
      

           // Exibe as informações da novo funcionario no console
           console.log(novoFuncionario);

           setFormState({
            nomeFuncionario: "",
            cargo: "",
          })
    };

    return (
        <>
            <Cabecalho />
            <section className='d-flex justify-content-center align-items-center h-100'>
                <div className='form'>
                    <Texto texto="Adicione um novo funcionário" corTexto="black" />
                    <form
                        method="POST"
                        className="text-center"

                    >
                        <Input
                            tipo="name"
                            placeholder="Nome"
                            valor={formState.nomeFuncionario}
                            onChange={(evento) => mudaFormState(evento, "nomeFuncionario")}
                        />
                        <Input
                            tipo="text"
                            placeholder="Cargo"
                            valor={formState.cargo}
                            onChange={(evento) => mudaFormState(evento, "cargo")}
                        />
                        <br></br>
                        <Botao texto="cadastrar" onClick={cadastraFuncionario} corTexto="white" />
                    </form>
                </div>
            </section>


        </>
    );

    }
    export default CadastroFuncionario;