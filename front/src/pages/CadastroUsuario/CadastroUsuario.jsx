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


  const [mostrarSenha, setMostrarSenha] = useState(false);

  const [mostrarConfirmarsenha, setMostrarConfirmarsenha] = useState(false);

  const [usuarios, setUsuarios] = useState([]);

  const [itemSelecionado, setItemSelecionado] = useState(null);

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
      alert('Usuário salvo com sucesso')

      await carregarUsuarios();

    } catch (error) {
      alert('Usuário já cadastrado, Tente Novamente!')
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

  const eventoSubmit = async (evento) => {
    evento.preventDefault();
    if (itemSelecionado) {
      await atualizarFormulario(formState)
    } else {
      await verificaRegister(evento)
    }
  };



  const atualizarFormulario = async (formState) => {
    try {
      await api.atualizarUsuario(formState)

      alert('Usuário editado com sucesso');
    } catch (error) {
      console.error('Erro ao editar o usuario:', error.message);
      alert('Erro ao editar o usuario');
    }

  };

  const carregarUsuarios = async () => {
    try {
      const dados = await api.listarUsuarios();
      setUsuarios(dados);
    } catch (error) {
      console.error('Erro ao carregar os usuarios:', error.message);
      console.log(error)
    }
  };

  const excluirUsuario = async (idusuarios) => {
    try {
      console.log('Tentando excluir usuário com ID:', idusuarios);

      await api.excluirUsuario(idusuarios);
      
      

      const novaLista = usuarios.filter((usuario) => usuario.idusuarios !== idusuarios);
      
      setUsuarios(novaLista);

    } catch (error) {
      console.error('Erro ao excluir o usuario:', error.message);
      console.log('Resposta da API:', error.response);
    }
  };
 

  const editarUsuario = async (idusuarios) => {
    try {
      const usuarioSelecionado = await api.buscarUsuarioPorId(idusuarios);
      setItemSelecionado(usuarioSelecionado);
      console.log('item:', itemSelecionado)
      setDadosDoFormulario(usuarioSelecionado.resultado[0]);

    } catch (error) {
      console.error('Erro ao editar o usuario:', error.message);
    }
  };

  useEffect(() => {
    carregarUsuarios();
  }, []);



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


 




  return (
    <>
      <Cabecalho />
      <main className='main' >
        <div className='fundo'>
          <section className='lateral-a'>
            <Textomaior texto="CADASTRE UM NOVO USUÁRIO" />
            <form onSubmit={eventoSubmit} className="form-cad">
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



              <Botao type="submit" texto="CADASTRAR" />

            </form>
          </section>

          <section className='lateral-b'>
            <h2 className="mb-4 text-center">Usuários Cadastrados</h2>
            <div className="table-responsive-md">
              <table className="table table-bordered table-striped">
                <thead>
                  <tr>
                    <th scope="col">Nome do usuário</th>
                    <th scope="col">Ações</th>
                  </tr>
                </thead>
                <tbody>
                {usuarios.map((usuario) => (
                <tr key={usuario.idusuarios} style={{ backgroundColor: 'white' }}>
                  <td>{usuario.nome}</td>
                  <td>
                    <button onClick={() => editarUsuario(usuario.idusuarios)} className="btn btn-warning me-1">Editar</button>
                    <button onClick={() => excluirUsuario(usuario.idusuarios)} className="btn btn-danger">Excluir</button>
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









