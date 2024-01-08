import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';



export const AutenticacaoContext = createContext();



export const AutenticacaoProvider = ({ children }) => {
    const navigate = useNavigate();

         
    
  

    const logout = () => {
        console.log("logout");
       
        navigate("/");

    }


    return (
        <AutenticacaoContext.Provider value={{ logout}}>
            {children}
        </AutenticacaoContext.Provider>

    )
}

