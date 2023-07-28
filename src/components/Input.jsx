import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'

function Input({ tipo, placeholder, valor, onChange }) {

  
  return (
      <>
              <input className='form-control' type={tipo} placeholder={placeholder}
                value={valor}
                onChange={(event) => {onChange(event)}}
              />
    </>
  )
}

export default Input

