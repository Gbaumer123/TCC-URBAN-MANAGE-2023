import React, { useState, useEffect } from 'react'
import './Home.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import Cabecalho from '../../components/Header/Cabecalho';
import Atividade from '../../components/Atividade';



const Home = () => {

  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    const usuarioSalvo = localStorage.getItem("usuarioLogado");
    if (usuarioSalvo) {
      setUsuario(JSON.parse(usuarioSalvo));
    }
  }, []);

  const [atividadesPendentes, setAtividadesPendentes] = useState([]);

  useEffect(() => {
    const atividadesSalvas = JSON.parse(localStorage.getItem("atividades")) || [];
    const atividadesPendentes = atividadesSalvas.filter(atividade => !atividade.concluida);
    setAtividadesPendentes(atividadesPendentes);
  }, []);


  return (
    <>
      <Cabecalho></Cabecalho>
   

      <div className="d-flex justify-content-between row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 border border-5 ">
        <div className='border border-1 flex-grow-1'>
          <h2>Atividades Pendentes</h2>
          <th>  <Atividade atividades={atividadesPendentes} /></th>
        
        </div>
        <div className='border border-1 flex-grow-1'>
          <h2>Atividades em andamento</h2>
          
        </div>
        <div className='border border-1 flex-grow-1'>
          <h2 >Atividades Concluídas</h2>
        </div>
      </div>
    </>
  )

};


export default Home


