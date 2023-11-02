import React, { useState } from 'react'
import Cabecalho from "../../components/Header/Cabecalho";
import Botao from "../../components/Botao";
import Input from "../../components/Input";
import Textomaior from '../../components/Textomaior';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';




const CadastroFuncionario = () => {

    const navigate = useNavigate();

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

    const cadastraFuncionario = async(evento) => {
        evento.preventDefault();
        /*const novoFuncionario = {
            id: Date.now(),
            nome: formState.nomeFuncionario,
            cargo: formState.cargo,
        };*/

        try {
            // Aqui você faz a solicitação HTTP para cadastrar o funcionário
            await axios.post("http://localhost:8800/CadastroFuncionario", {
              nomeFuncionario: formState.nomeFuncionario,
              cargo: formState.cargo,
            });
      
            console.log('Funcionário cadastrado com sucesso!');
      
            // Redirecione o usuário para a página desejada após o cadastro bem-sucedido
            navigate('/Equipes'); // Substitua '/outra-pagina' pelo caminho desejado
      
          } catch (error) {
            console.error('Erro ao cadastrar usuário:', error);
            alert('Erro ao cadastrar usuário. Verifique os dados e tente novamente.');
          }
      
          // Limpe o estado do formulário após o cadastro
          setFormState({
            nomeFuncionario: "",
            cargo: "",
          });
        };

        /*
        // Recupera o array de funcionarios do localStorage ou cria um novo array vazio
        const funcionariosStorage = JSON.parse(localStorage.getItem("funcionarios")) || [];

        /*verifica se é um array, Se for, ele atribui esse valor à variável 
        "funcionarios", caso contrário, atribui um novo array vazio. 
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
          })  */
    
  
            

    return (
        <>
            <Cabecalho />
            <section className='d-flex justify-content-center align-items-center h-100'>
                <div className='form'>
                    <Textomaior texto="Adicione um novo funcionário" corTexto="black" />
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