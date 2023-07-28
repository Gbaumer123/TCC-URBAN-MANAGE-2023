import React from "react"
import 'bootstrap/dist/css/bootstrap.min.css'

function Botao({onClick,texto, corTexto}) {

    const estiloBotao = {
        color: corTexto
    }
    return (
    <button className="btn btn-primary mx-2" id='teste' style={estiloBotao} onClick={onClick} >
        {texto}
    </button>
    )
}

export default Botao

