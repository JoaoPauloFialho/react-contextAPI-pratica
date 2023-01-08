import Produto from '../../components/Produto'
import style from './produtos.module.css'
import produtos from '../../components/assets/produtos.json'
import { useLoginContext } from '../../common/context/Login'
import { useCarrinhoContext } from '../../common/context/Carrinho'
import { useNavigate } from 'react-router'

export default function Produtos() {
    const { nome } = useLoginContext()
    const { quantidade } = useCarrinhoContext()
    const nav = useNavigate()

    return (
        <>
            <section className={style.produtos}>
                <h1>Olá {nome}</h1>
                <span className={style.spanCarrinho}>
                    <h1>PRODUTOS NO CARRINHO  {quantidade}</h1>
                    <button 
                    onClick={() => nav('/carrinho')}
                    disabled={quantidade === 0}
                    >Ir para carrinho</button>
                </span>
                {produtos.map(produto => <Produto key={produto.id} produto={produto} />)}
            </section>
        </>
    )
}