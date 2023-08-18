import React from 'react';
import './Input.css';

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
        }
        }
      />
    </>
  );
}

export default Input;






