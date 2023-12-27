import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';



export const AutenticacaoContext = createContext();



export const AutenticacaoProvider = ({ children }) => {
    const navigate = useNavigate();

    /*//const [usuario, setUsuario] = useState(null);
    //const [carregando, setCarregando] = useState(true);
    //const [usuariosCadastrados, setUsuariosCadastrados] = useState([]);

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
    };*/
    
         
    
    const verificaLogin = async (nomeUsuario, senhaLogin) => {
        // Implemente a lógica de verificação de login aqui, incluindo a chamada para o servidor
        try {
            const resposta = await axios.post("http://localhost:8800/", {
                nome: nomeUsuario,
                senha: senhaLogin,
            });
            return resposta;
        } catch (err) {
            console.error("Erro ao verificar login:", err);
            throw err;
        }
    };
      

   /* useEffect(() => {
        const carregarUsuariosCadastrados = () => {
            const usuariosSalvos = localStorage.getItem("usuariosCadastrados");
            if (usuariosSalvos) {
                setUsuariosCadastrados(JSON.parse(usuariosSalvos));
            }
        };
        carregarUsuariosCadastrados();
    }, []);
    */

    const logout = () => {
        console.log("logout");
       
        navigate("/");

    }

    const recuperarUsuario = () => {
        const usuario = localStorage.getItem("usuarioLogado");
        if (usuario) {
            setUsuario(JSON.parse(usuario));
        }
    };

    return (
        <AutenticacaoContext.Provider value={{ verificaLogin, logout, recuperarUsuario }}>
            {children}
        </AutenticacaoContext.Provider>

    )
}

