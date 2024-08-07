import React, { useState, useContext, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from "react-router-dom";
import { AutenticacaoContext } from '../../Contexts/Autenticacao';
import "bootstrap/dist/js/bootstrap.min.js";

function Cabecalho() {
  const navigate = useNavigate();
  const { logout } = useContext(AutenticacaoContext);

  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    const usuarioSalvo = localStorage.getItem('usuarioLogado');
    if (usuarioSalvo) {
      const usuario = JSON.parse(usuarioSalvo);
      setUsuario(usuario);
    }
  }, []);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <button className="btn btn-dark" onClick={() => navigate('/home')}>Página inicial</button>
            </li>
            <li className="nav-item">
              <button className="btn btn-dark" onClick={() => navigate('/CadastroEquipe')}>Equipes</button>
            </li>
            <li className="nav-item">
              <button className="btn btn-dark" onClick={() => navigate('/CadastroFuncionario')}>Funcionários</button>
            </li>
            <li className="nav-item">
              <button className="btn btn-dark" onClick={() => navigate('/CadastroVeiculos')}>Veículos</button>
            </li>
            <li className="nav-item">
              <button className="btn btn-dark" onClick={() => navigate('/CadastroUsuario')}>Usuários</button>
            </li>
            <li className="nav-item">
              <button className="btn btn-dark" onClick={() => navigate('/MostraAtividadeTV')}>Modo TV</button>
            </li>
          </ul>

          <ul className="navbar-nav">
            <li className="nav-item">
              <button className="btn btn-dark" onClick={() => navigate('/CadastroAtividade')}>Nova Atividade</button>
            </li>
          </ul>

          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <div className="dropdown">
                <button className="btn btn-dark dropdown-toggle" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
                  {usuario ? usuario.nome : ''}
                </button>
                <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMenuLink">
                  <li><button className="dropdown-item text-center" onClick={logout}>Sair</button></li>
                </ul>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Cabecalho;
