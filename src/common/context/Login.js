import { createContext, useContext, useState } from 'react'
import { useNavigate } from 'react-router'

export const LoginContext = createContext()

export function LoginContextProvider({children}){
    const [nome, setNome] = useState()
    const [saldo, setSaldo] = useState(0)

    return(
        <LoginContext.Provider value={{nome, setNome, saldo, setSaldo}}>
            {children}
        </LoginContext.Provider>
    )
}

export function useLoginContext(){
    const {nome, setNome, saldo, setSaldo} = useContext(LoginContext)
    const nav = useNavigate()

    function salvaLogin(event){
        event.preventDefault()
        nav('/produtos')
    }
    

    return{
            nome,
            setNome,
            saldo,
            setSaldo,
            salvaLogin
        }
}