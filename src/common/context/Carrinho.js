import { createContext, useContext, useEffect, useState } from 'react'
import { useLoginContext } from './Login'
import { usePagamentoContext } from './Pagamento'

export const CarrinhoContext = createContext()

export function CarrinhoContextProvide({ children }) {
    const [carrinho, setCarrinho] = useState([])
    const [quantidade, setQuantidade] = useState(0)
    const [total, setTotal] = useState(0)

    return (
        <CarrinhoContext.Provider value={{
            carrinho,
            setCarrinho,
            quantidade,
            setQuantidade,
            total,
            setTotal
        }}>
            {children}
        </CarrinhoContext.Provider>
    )
}

export const useCarrinhoContext = () => {
    const {
        carrinho,
        setCarrinho,
        quantidade,
        setQuantidade,
        total,
        setTotal
    } = useContext(CarrinhoContext)

    const {tipoPagamento = 1} = usePagamentoContext()
    const {setSaldo} = useLoginContext()

    const adicionarProduto = (produtoAdicionar) => {
        const temOProduto = carrinho.some(produto => produto.id === produtoAdicionar.id)
        if (temOProduto) {
            return mudarQuantidade(produtoAdicionar, 1)

        }
        produtoAdicionar.quantidade = 1
        return setCarrinho([...carrinho, produtoAdicionar])
    }

    const removeProduto = (produtoRemover) => {
        if (produtoRemover.quantidade > 1) {
            return mudarQuantidade(produtoRemover, -1)
        }
        return setCarrinho([...carrinho.filter(
            produtoCarrinho => produtoCarrinho.id !== produtoRemover.id
        )])
    }

    const mudarQuantidade = (produto, quantidade) => {
        return setCarrinho(carrinho.map(produtoCarrinho => {
            if (produtoCarrinho.id === produto.id) {
                produtoCarrinho.quantidade += quantidade
            }
            return produtoCarrinho
        }))
    }

    function efetuarCompra(){
        setCarrinho([])
        setSaldo(prevSaldo => prevSaldo-total)
    }

    useEffect(() => {
        const {novoTotal, novaQuantidade} = carrinho.reduce((contador, produto)=>({
            novaQuantidade: contador.novaQuantidade + produto.quantidade ,
            novoTotal: contador.novoTotal + (produto.quantidade * produto.preco)
        }), {
            novaQuantidade:0,
            novoTotal:0,
        })
        setQuantidade(novaQuantidade)
        setTotal(novoTotal * tipoPagamento.juros)
    }, [carrinho, setQuantidade, setTotal, tipoPagamento])

    return {
        carrinho,
        setCarrinho,
        total,
        adicionarProduto,
        removeProduto,
        quantidade,
        efetuarCompra
    }

}