import { createContext, useContext, useState } from "react";

export const PagamentoContext = createContext()

export function PagamentoProvider({ children }) {
    const tiposPagamento = [
        {
            nome: 'Boleto',
            juros: 1,
            id: 1
        },
        {
            nome: 'Crédito',
            juros: 1.3,
            id: 2
        },
        {
            nome: 'PIX',
            juros: 1,
            id: 3
        },
        {
            nome: 'Crediário',
            juros: 1.5,
            id: 4
        }
    ]
    const [tipoPagamento, setTipoPagamento] = useState(tiposPagamento[0])

    return (
        <PagamentoContext.Provider value={{ tipoPagamento, tiposPagamento, setTipoPagamento }}>
            {children}
        </PagamentoContext.Provider>
    )

}

export const usePagamentoContext = () =>{
    const {tipoPagamento, tiposPagamento, setTipoPagamento} = useContext(PagamentoContext)

    function mudaPagamento(id){
        setTipoPagamento(tiposPagamento[id-1])
    }

    return{
        tipoPagamento,
        tiposPagamento,
        mudaPagamento
    }
}