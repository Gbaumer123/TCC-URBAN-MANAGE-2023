import React from 'react';
import './Input.css';

function Input({ tipo, placeholder, valor, onChange, icone }) {
  return (
    <>
      <input
        className={`input ${icone}`} // Altere a classe para 'inputUsuario'
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






