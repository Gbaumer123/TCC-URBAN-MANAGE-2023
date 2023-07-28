import React, { useState, useEffect, createContext } from "react";


import { useNavigate } from "react-router-dom";

//cria uma area global para armazenar informações
//Pode ser acessado em todo o sistema

export const AutenticacaoContext = createContext();

export const AutenticacaoProvider = ({ children }) => {
    const navigate = useNavigate();

    const [usuario, setUsuario] = useState(null);
    const [carregando, setCarregando] = useState(true);
    const [usuariosCadastrados, setUsuariosCadastrados] = useState([]);

    //aqui é onde irá gravar as informaçoes do utimo login
    useEffect(() => {
        const recuperarUsuario = localStorage.getItem('user');

        if (recuperarUsuario) {
            setUsuario(JSON.parse(recuperarUsuario));
        }

        setCarregando(false);
    }, []);

    const recuperarUsuariosCadastrados = () => {
        const usuariosCadastrados = localStorage.getItem('usuariosCadastrados') ?? [];
        return JSON.parse(usuariosCadastrados) ;
    };

         
    const login = (nomeUsuario, senhaLogin, lembrarUsuario) => {
        const usuariosCadastrados = recuperarUsuariosCadastrados();
        const usuario = usuariosCadastrados.find(
          (user) => user.nome === nomeUsuario && user.senha === senhaLogin
        );
        if (usuario) {
          setUsuario(usuario);
          localStorage.setItem('usuarioLogado', JSON.stringify(usuario));
          navigate('/home');
        } else {
          alert('Nome de usuário ou senha inválidos.');
        }
      };
      

    const CadastroUsuario = (novoUsuario) => {
        // Verifica se o nome de usuário já existe na lista
        if (usuariosCadastrados.find((user) => user.nome === novoUsuario.nome)) {
          alert('O nome de usuário já está em uso.');
          return;
        }

        // Adiciona o novo usuário à lista de usuários cadastrados
        const novaListaUsuarios = [...usuariosCadastrados, novoUsuario];
        setUsuariosCadastrados(novaListaUsuarios);

        localStorage.setItem("usuariosCadastrados", JSON.stringify(novaListaUsuarios));

    };

    useEffect(() => {
        const carregarUsuariosCadastrados = () => {
            const usuariosSalvos = localStorage.getItem("usuariosCadastrados");
            if (usuariosSalvos) {
                setUsuariosCadastrados(JSON.parse(usuariosSalvos));
            }
        };
        carregarUsuariosCadastrados();
    }, []);


    const logout = () => {
        console.log("logout");
        localStorage.removeItem('usuarioLogado')
        setUsuario(null);
        navigate("/");

    }

    const recuperarUsuario = () => {
        const usuario = localStorage.getItem("usuarioLogado");
        if (usuario) {
            setUsuario(JSON.parse(usuario));
        }
    };

    return (
        <AutenticacaoContext.Provider value={{ autenticado: !!usuario, usuario, carregando, login, CadastroUsuario, logout, recuperarUsuario }}>
            {children}
        </AutenticacaoContext.Provider>

    )
}


