import React from "react"
import 'bootstrap/dist/css/bootstrap.min.css'

function Botao({onClick,texto}) {

    const estiloBotao = {
        color: 'black',
        borderRadius: '65px',
    }
    return (
    <button className="btn btn-light"  style={estiloBotao} onClick={onClick} >
        {texto}
    </button>
    )
}

export default Botao

