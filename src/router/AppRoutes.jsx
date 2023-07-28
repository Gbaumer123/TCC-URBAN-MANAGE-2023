import React, { useContext, useState } from "react";

import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Login from "../pages/Login/Login";
import Home from "../pages/Home/Home";
import CadastroUsuario from "../pages/CadastroUsuario/CadastroUsuario";
import RecuperaSenha from "../pages/recuperarSenha/RecuperaSenha";
import { AutenticacaoProvider, AutenticacaoContext } from "../Contexts/Autenticacao";
import CadastroFuncionario from "../pages/CadastroFuncionario/CadastroFuncionario";
import CadastroMaquina from "../pages/CadastroMaquina/CadastroMaquina";
import CadastroAtividade from "../pages/CadastroAtividade/CadastroAtividade";
import Equipes from "../pages/Equipes/equipes";
import Veiculos from "../pages/Veiculos/veiculos";





const AppRoutes = () => {

    const Private = ({ children }) => {
        const { autenticado, carregando } = useContext(AutenticacaoContext);
       
        
        if (carregando){
            return <div className="carregando">Carregando...</div>
        }
        
            if (!autenticado) {
                return <Navigate to={"/"} />
            }

        return children;
    };

    return (

        <Router>
            <AutenticacaoProvider>
                <Routes>
                    <Route exact path="/" element={<Login />} />
                    <Route exact path="/home" element={<Private> <Home /> </Private>} />
                    <Route exact path="/cadastro" element={<CadastroUsuario />} />
                    <Route exact path="/RecuperaSenha" element={<RecuperaSenha />} />
                    <Route exact path="/CadastroFuncionario" element={<Private><CadastroFuncionario /> </Private>} />
                    <Route exact path="/CadastroMaquina" element={<Private> <CadastroMaquina /> </Private>} />
                    <Route exact path="/CadastroAtividade" element={ <Private> <CadastroAtividade /> </Private>} />
                    <Route exact path="/Equipes" element={<Private> <Equipes /> </Private>} />
                    <Route exact path="/Veiculos" element={<Private> <Veiculos /> </Private>} />
                    
                </Routes>
            </AutenticacaoProvider>
        </Router >
    );
}

export default AppRoutes;



