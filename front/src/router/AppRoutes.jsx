import React, { useContext, useState } from "react";

import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Login from "../pages/Login/Login";
import Home from "../pages/Home/Home";
import CadastroUsuario from "../pages/CadastroUsuario/CadastroUsuario";
import RecuperaSenha from "../pages/recuperarSenha/RecuperaSenha";
import RecuperaCodigo from "../pages/recuperarCodigo/recuperaCodigo";
import { AutenticacaoProvider, AutenticacaoContext } from "../Contexts/Autenticacao";
import CadastroFuncionario from "../pages/CadastroFuncionario/CadastroFuncionario";
import CadastroVeiculos from "../pages/CadastroMaquina/CadastroVeiculo";
import CadastroAtividade from "../pages/CadastroAtividade/CadastroAtividade";
import CadastroEquipes from "../pages/Equipes/CadastroEquipe";
import AlteraSenha from "../pages/RecuperaAlteraSenha/AlteraSenha";
import MostraAtividadeTv from "../pages/MostraAtividadesTV/MostraAtividadesTV";





const AppRoutes = () => {

    /*const Private = ({ children }) => {
        const { autenticado, carregando } = useContext(AutenticacaoContext);
       
        
        if (carregando){
            return <div className="carregando">Carregando...</div>
        }
        
            if (!autenticado) {
                return <Navigate to={"/"} />
            }

        return children;
    };*/

    return (

        <Router>
            <AutenticacaoProvider>
                <Routes>
                    <Route exact path="/" element={<Login />} />
                    <Route exact path="/home" element={ <Home /> } />
                    <Route exact path="/CadastroUsuario" element={<CadastroUsuario />} />
                    <Route exact path="/RecuperaSenha" element={<RecuperaSenha />} />
                    <Route exact path="/RecuperaCodigo" element={<RecuperaCodigo />} />
                    <Route exact path="/AlteraSenha" element={<AlteraSenha />} />
                    <Route exact path="/CadastroFuncionario" element={<CadastroFuncionario /> } />
                    <Route exact path="/CadastroVeiculos" element={ <CadastroVeiculos /> } />
                    <Route exact path="/CadastroEquipe" element={ <CadastroEquipes /> } />
                    <Route exact path="/CadastroAtividade" element={ <CadastroAtividade /> } />
                    <Route exact path="/MostraAtividadeTv" element={ <MostraAtividadeTv/> } />
                
                   
                    
                </Routes>
            </AutenticacaoProvider>
        </Router >
    );
}

export default AppRoutes;


