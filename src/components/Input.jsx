import React from 'react';
import './Input.css'; // Importe o arquivo CSS local que contém a classe .inputUsuario

function Input({ tipo, placeholder, valor, onChange }) {
  return (
    <>
      <input
        className='inputUsuario' // Altere a classe para 'inputUsuario'
        type={tipo}
        placeholder={placeholder}
        value={valor}
        onChange={(event) => {
          onChange(event);
        }}
      />
    </>
  );
}

export default Input;






