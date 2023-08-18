import React from "react"
import 'bootstrap/dist/css/bootstrap.min.css'

function Botao({onClick,texto, corTexto}) {

    const estiloBotao = {
        color: '#FFED02',
        borderRadius: '65px',
    }
    return (
    <button className="btn btn-dark "  style={estiloBotao} onClick={onClick} >
        {texto}
    </button>
    )
}

export default Botao

