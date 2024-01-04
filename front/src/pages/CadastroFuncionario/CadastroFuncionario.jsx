import React, { useState, useEffect } from 'react'
import Cabecalho from "../../components/Header/Cabecalho";
import Botao from "../../components/Botao";
import Input from "../../components/Input";
import Textomaior from '../../components/Textomaior';
import Textomenor from '../../components/Textomenor';
import { useNavigate } from 'react-router-dom';
import "./CadastroFuncionario.css";




const CadastroFuncionario = () => {

  const navigate = useNavigate();

  const [formState, setFormState] = useState({
    nomeFuncionario: "",
    cargo: "",
    telefone: "",
    dataNasc: "",
    equipe: "",
  });

  const mudaFormState = (evento, chave) => {
    setFormState({
      ...formState,
      [chave]: evento.target.value,
    });
  };

  const cadastraFuncionario = async (evento) => {
    evento.preventDefault();

    // Limpe o estado do formulário após o cadastro
    setFormState({
      nomeFuncionario: "",
      cargo: "",
      telefone: "",
      dataNasc: "",
      equipe: "",
    });
  };

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
        <section className='lateral3'>
          <Textomaior texto="ADICIONE UM NOVO FUNCIONÁRIO" corTexto="black" />
          <form method="POST" className="formularioFunc">
            <Textomenor texto='Nome do funcionário:' />
            <Input
              tipo="name"
              placeholder="Nome do funcionário"
              valor={formState.nomeFuncionario}
              onChange={(evento) => mudaFormState(evento, "nomeFuncionario")}
            />
            <Textomenor texto='Cargo:' />
            <Input
              tipo="text"
              placeholder="Cargo"
              valor={formState.cargo}
              onChange={(evento) => mudaFormState(evento, "cargo")}
            />
            <Textomenor texto='Equipe:' />
            <select class="select" value={formState.campo}
              onChange={(evento) => mudaFormState(evento, "equipe")}>
              <option selected >Equipes</option>
              <option value="1">Rodoviário</option>
              <option value="2">Obras</option>
            </select>

            <Botao texto="CADASTRAR" onClick={cadastraFuncionario} corTexto="white" />
          </form>
        </section>

        <section className='lateral4'>
          <div className="table-responsive">
            <h3 className="mb-4 text-center ">Funcionários Cadastrados</h3>
            <table className="table table-bordered table-striped">
              <thead>
                <tr>
                  <th scope="col">Nome do Funcionário</th>
                  <th scope="col">Cargo</th>
                  <th scope='col'> Equipe</th>
                  <th scope="col">Ações</th>
                </tr>
              </thead>
              <tbody>
                {veiculos.map((veiculo) => (
                  <tr key={veiculo.id} style={{ backgroundColor: 'white' }}>
                    <td>{veiculo.nomeVeiculo}</td>
                    <td>{veiculo.placa}</td>
                    <td>{veiculo.renavam}</td>
                    <td>
                      <button className="btn btn-warning me-2">Editar</button>
                      <button className="btn btn-danger">Excluir</button>
                    </td>
                  </tr>
                ))}

              </tbody>
            </table>
          </div>

        </section>
      </main>
    </>
  );

}
export default CadastroFuncionario;