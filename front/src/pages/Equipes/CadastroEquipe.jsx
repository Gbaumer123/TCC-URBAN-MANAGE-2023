import React, { useState, useEffect } from 'react'
import Cabecalho from "../../components/Header/Cabecalho";
import Botao from "../../components/Botao";
import Textomaior from '../../components/Textomaior';
import Textomenor from '../../components/Textomenor';
import Input from '../../components/Input';
import "./CadastroEquipe.css";



const CadastroEquipe = () => {

    const [formState, setFormState] = useState(
        {
            nomeEquipe: "",
        }
    );

    const mudaFormState = (evento, chave) => {
        //usar essa forma para o tcc
        setFormState({
            ...formState,
            [chave]: evento.target.value,
        });
    };

    const cadastraEquipe = (evento) => {
        evento.preventDefault();


        setFormState({
            nomeVeiculo: "",
            placa: "",
            renavam: "",
        });

    }



    const [veiculos, setVeiculos] = useState([]);



    useEffect(() => {
        // Verificar se existem máquinas salvas no localStorage
        const veiculosSalvos = localStorage.getItem("veiculos");
        if (veiculosSalvos) {
            setVeiculos(JSON.parse(veiculosSalvos));
        }
    }, []);

    return (
        <>
            <Cabecalho />


            <main>
                <section className='lateral5'>
                    <Textomaior texto='ADICIONE UM NOVA EQUIPE' corTexto='black' />
                    <form method='POST' className='formularioEquipe'>
                        <Textomenor texto='Nome da equipe:' />
                        <Input
                            tipo='name'
                            placeholder='Nome da equipe'
                            valor={formState.nomeEquipe}
                            onChange={(evento) => mudaFormState(evento, 'nomeEquipe')}
                        />

                        <Botao onClick={cadastraEquipe} texto='CADASTRAR' corTexto='white' />
                    </form>
                </section>

                <section className='lateral6'>
                    <div className='table-responsive'>
                        <h3 className='mb-4 text-center '>Equipes Cadastradas</h3>
                        {veiculos.map((veiculo) => (
                            <div key={veiculo.id}>
                                <h4 className='mb-3 text-center'>{veiculo.nomeVeiculo}</h4>
                                <table className='table table-bordered table-striped'>
                                    <thead>
                                        <tr>
                                            <th scope='col'>Nome do Funcionário</th>
                                            {/* Adicione mais colunas se necessário */}
                                            <th scope='col'>Ações</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {veiculos.map((veiculo) => (
                                            <tr key={veiculo.id} style={{ backgroundColor: 'white' }}>
                                                <td>{veiculo.placa}</td>
                                                {/* Adicione mais células se necessário */}
                                                <td>
                                                    <button className='btn btn-warning me-2'>Editar</button>
                                                    <button className='btn btn-danger'>Excluir</button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ))}
                    </div>
                </section>
            </main>




        </>
    )
}

export default CadastroEquipe

