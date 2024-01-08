import React, { useState, useContext, useEffect } from 'react'
import "./CadastroUsuario.css";
import { useNavigate } from 'react-router-dom';
import Botao from '../../components/Botao';
import Textomaior from '../../components/Textomaior';
import Input from '../../components/Input';
import Textomenor from '../../components/Textomenor';
import api from '../../services/api';
import 'bootstrap/dist/css/bootstrap.min.css';
import Cabecalho from '../../components/Header/Cabecalho';



const CadastroUsuario = () => {

  const [mensagem, setMensagem] = useState('');

  const [mostrarSenha, setMostrarSenha] = useState(false);

  const [mostrarConfirmarsenha, setMostrarConfirmarsenha] = useState(false);

  const navigate = useNavigate();


  const [formState, setFormState] = useState(
    //usar essa forma para o tcc
    {
      nome: "",
      email: "",
      senha: "", //sao chaves que recebem valor
      senha2: "",
      campo: "",
    }
  );

  const mudaFormState = (evento, chave) => {
    //usar essa forma para o tcc
    setFormState({
      ...formState,
      [chave]: evento.target.value,
    });
  };

  const verificaRegister = async (evento) => {
    evento.preventDefault();
    console.log(formState);

    // Verifica se todos os campos foram preenchidos
    if (!formState.nome || !formState.email || !formState.senha || !formState.senha2 || !formState.campo) {
      alert("Todos os campos são obrigatórios!");
      return;
    }

    // Verifica se a senha e a confirmação de senha são iguais
    if (formState.senha !== formState.senha2) {
      alert("As senhas devem ser iguais!");
      return;
    }

    if (formState.nome.length < 3) {
      alert("Nome inválido!")
      return;
    }

    if (formState.senha.length < 8) {
      alert("Senha deve ter mais de 8 carateres!")
      return;
    }

    if (!validarEmail(formState.email)) {
      alert('E-mail inválido!');
      return;
    }

    try {
      await api.adicionaUsuario(formState);

      setMensagem('Usuário salvo com sucesso');

    } catch (error) {
      alert('Usuário já cadastrado, Tente Novamente!')
      console.error('Erro ao salvar o usuário:', error);
      setMensagem('Erro ao salvar o usuário');
    }

    // Limpe o estado do formulário após o cadastro
    setFormState({
      nome: "",
      email: "",
      senha: "",
      senha2: "",
      campo: "",
    });
  }

  const validarEmail = (email) => {
    const testeEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return testeEmail.test(email);
  };

  const MostrarSenha = () => {
    setMostrarSenha(!mostrarSenha);

  };

  const MostrarConfirmarsenha = () => {
    setMostrarConfirmarsenha(!mostrarConfirmarsenha);

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
      <main className='main' >
        <div className='fundo'>
          <section className='lateral-a'>
            <Textomaior texto="CADASTRE UM NOVO USUÁRIO" />
            <form method="POST" className="form-cad">

              {mensagem && <p>{mensagem}</p>}
              <Textomenor texto='Nome do usuário:' />
              <Input
                tipo="name"
                placeholder="Nome do usuário"
                valor={formState.nome}
                onChange={(evento) => mudaFormState(evento, "nome")}
                icone='usuario'
              />

              <Textomenor texto='Email:' />
              <Input
                tipo="email"
                placeholder="Email"
                valor={formState.email}
                onChange={(evento) => mudaFormState(evento, "email")}
                icone='email'
              />

              <Textomenor texto='Senha:' />
              <Input
                tipo={mostrarSenha ? 'text' : 'password'}
                placeholder="senha"
                valor={formState.senha}
                onChange={(evento) => mudaFormState(evento, "senha")}
                icone='senha'
              />
              <div style={{ marginBottom: '0px', display: 'flex', alignItems: 'center' }}>
                <input type="checkbox" className="cssCheckbox" onChange={MostrarSenha} />
                <label className='mostrasenha'>Mostrar senha</label>
              </div>

              <Textomenor texto='Confirme sua senha:' />
              <Input
                tipo={mostrarConfirmarsenha ? 'text' : 'password'}
                placeholder="Confirme sua senha"
                valor={formState.senha2}
                onChange={(evento) => mudaFormState(evento, "senha2")}
                icone='senha'
              />

              <div style={{ marginBottom: '0px', display: 'flex', alignItems: 'center' }}>
                <input type="checkbox" className="cssCheckbox" onChange={MostrarConfirmarsenha} />
                <label className='mostrasenha'>Mostrar senha</label>
              </div>

              <Textomenor texto='Cargo:' />
              <article className='gap-input-cad'>
                <select class="select" value={formState.campo}
                  onChange={(evento) => mudaFormState(evento, "campo")}>
                  <option value="" disabled selected >Cargo</option>
                  <option value="Secretário">Secretário</option>
                  <option value="Engenheiro">Engenheiro</option>
                  <option value="Prefeito">Prefeito</option>
                </select>
              </article>

              <Botao onClick={verificaRegister} texto="CADASTRAR" />

            </form>
          </section>

          <section className='lateral-b'>
            <h2 className="mb-4 text-center">Usuários Cadastrados</h2>
            <div className="table-responsive-md">
              <table className="table table-bordered table-striped">
                <thead>
                  <tr>
                    <th scope="col">Nome do usuário</th>
                    <th scope="col">Email</th>
                    <th scope='col'>Cargo</th>
                    <th scope='col'>Senha</th>
                    <th scope="col">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {veiculos.map((veiculo) => (
                    <tr key={veiculo.id} style={{ backgroundColor: 'white' }}>
                      <td>{veiculo.nomeVeiculo}</td>
                      <td>{veiculo.placa}</td>
                      <td>{veiculo.renavam}</td>
                      <td>{veiculo.renavam}</td>
                      <td>
                        <button className="btn btn-warning me-1">Editar</button>
                        <button className="btn btn-danger">Excluir</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

        </div>
      </main>
    </>
  );
}

export default CadastroUsuario;









