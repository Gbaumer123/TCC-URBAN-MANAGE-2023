import React from "react"
import 'bootstrap/dist/css/bootstrap.min.css'

function Texto({texto, corTexto}) {

    const estiloTexto = {
        color: corTexto
    }
    return (
    <h1 className="text-center font-weight-bold" style={estiloTexto}>
        {texto}
    </h1>
    )
}

export default Texto

