import React, { useState,useContext, useEffect } from "react"
import 'bootstrap/dist/css/bootstrap.min.css'
import { useNavigate} from "react-router-dom"
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
    <nav className="navbar navbar-expand-lg navbar-dark bg-secondary">
      <div className="container-fluid">
        <a className="navbar-brand">
        <button className="btn btn-secondary" onClick={() => navigate('/home')}>Home</button>
        </a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <button className="btn btn-secondary" onClick={() => navigate('/CadastroEquipe')}>Equipes</button>
            </li>
            <li className="nav-item">
              <button className="btn btn-secondary" onClick={() => navigate('/CadastroFuncionario')}>Funcionários</button>
            </li>
            <li className="nav-item">
              <button className="btn btn-secondary" onClick={() => navigate('/CadastroVeiculos')}>Veículos</button>
            </li>
          </ul>
          
          <li className="nav-item">
              <button className="btn btn-secondary" onClick={() => navigate('/CadastroAtividade')}>  Nova Atividade </button>
            </li>
          
         
          <div className="d-flex align-items-center">
            <div className="dropdown">
              <a className="btn btn-secondary dropdown-toggle flex-wrap text-center" role="button" id="dropdownMenuLink" 
              data-bs-toggle="dropdown" 
              aria-expanded="false">
                  { usuario ? usuario.nome : '' }
              </a>
              <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMenuLink">
                <li><a className="dropdown-item text-center">Profile</a></li>
                <li><a className="dropdown-item text-center">Settings</a></li>
              
                <li><button className="dropdown-item text-center" onClick={logout}>Logout</button></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Cabecalho