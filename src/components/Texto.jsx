import React from "react"
import './Texto.css';

function Texto({texto}) {
    return (
    <h1 className='Textomaior' >
        {texto}
    </h1>
    )
}

export default Texto

