import React, { useState, useContext, useEffect } from 'react'
import { AutenticacaoContext } from '../../Contexts/Autenticacao';
import "./CadastroUsuario.css";
import { useNavigate } from 'react-router-dom';
import Botao from '../../components/Botao';
import Textomaior from '../../components/Textomaior';
import Input from '../../components/Input';
import Textomenor from '../../components/Textomenor';
import api from '../../services/api';
import 'bootstrap/dist/css/bootstrap.min.css';



const CadastroUsuario = () => {

  const [mensagem, setMensagem] = useState('');

  const [mostrarSenha, setMostrarSenha] = useState(false);

  const { logout } = useContext(AutenticacaoContext)

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

  const validarEmail = (email) => {
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regexEmail.test(email);
  };

  const MostrarSenha = () => {
    setMostrarSenha(!mostrarSenha);
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
      await api.addUser(formState);

      setMensagem('Usuário salvo com sucesso');
      navigate('/');

    } catch (error) {
      alert('Usuário já cadastrado. Tente Novamente!')
      console.error('Erro ao salvar o usuário:', error.message);
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

  const [maquinas, setMaquinas] = useState([]);



  useEffect(() => {
    // Verificar se existem máquinas salvas no localStorage
    const maquinasSalvas = localStorage.getItem("maquinas");
    if (maquinasSalvas) {
      setMaquinas(JSON.parse(maquinasSalvas));
    }
  }, []);


  return (
    <>
      <main>
        <body className='fundoDesfocado d-flex'>

          <section className='lateral-a'>
            <Textomaior texto="CRIE SUA CONTA" />
            <form method="POST" className="form-cad">

              {mensagem && <p>{mensagem}</p>}
              <Textomenor texto='Nome do usuário:' />
              <Input
                tipo="name"
                placeholder="Usuário"
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

              <input type="checkbox" onChange={MostrarSenha} />
              <label>Mostrar senha</label>
              <div style={{ marginBottom: '0px' }}></div>


              <Textomenor texto='Confirme sua senha:' />
              <Input
                tipo={mostrarSenha ? 'text' : 'password'}
                placeholder="Confirme sua senha"
                valor={formState.senha2}
                onChange={(evento) => mudaFormState(evento, "senha2")}
                icone='senha'
              />
              <input type="checkbox" onChange={MostrarSenha} />
              <label >Mostrar senha</label>
              <div style={{ marginBottom: '0px' }}></div>

              <Textomenor texto='Cargo:' />
              <article className='gap-input-cad'>
                <select class="select" value={formState.campo}
                  onChange={(evento) => mudaFormState(evento, "campo")}>
                  <option selected >Cargo</option>
                  <option value="1">Secretário</option>
                  <option value="2">Engenheiro</option>
                  <option value="3">Prefeito</option>
                </select>

                <Botao onClick={verificaRegister} texto="CADASTRAR" />


              </article>
            </form>

          </section>



          <section className='lateral-b'>
            
              <h3 className="mb-4 text-center ">Usuários Cadastrados</h3>
              <div className="table-responsive">
                <table className="table table-bordered table-striped">
                  <thead>
                    <tr>
                      <th scope="col">Nome do usuário</th>
                      <th scope="col">Cargo</th>
                      <th scope="col">Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {maquinas.map((maquina) => (
                      <tr key={maquina.id} style={{ backgroundColor: 'white' }}>
                        <td>{maquina.nomeMaquina}</td>
                        <td>{maquina.placa}</td>
                        <td>{maquina.Renavam}</td>
                        <td>
                          <button className="btn btn-warning me-3">Editar</button>
                          <button className="btn btn-danger">Excluir</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
        
          </section>

        </body>
      </main>
    </>
  );
}

export default CadastroUsuario;









