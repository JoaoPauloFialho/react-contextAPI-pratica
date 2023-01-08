import style from './produto.module.css'
import { AiOutlineMinus } from 'react-icons/ai'
import { GrAdd } from 'react-icons/gr'
import { useCarrinhoContext } from '../../common/context/Carrinho'

export default function Produto({ produto }) {
    const { carrinho, removeProduto, adicionarProduto } = useCarrinhoContext()

    return (
        <div id={produto.id} className={style.produto}>
            <span className={style.dados}>
                <p>{produto.nome}</p>
                <p>{produto.preco}</p>
            </span>
            <button
                className={style.subtrai}
                disabled={!(carrinho.some(carrinhoProduto => carrinhoProduto.id === produto.id))}
                onClick={() => removeProduto(produto)}
            >
                <AiOutlineMinus />
            </button>
            {produto?.quantidade || 0}
            <button
                className={style.soma}
                onClick={() => adicionarProduto(produto)} >
                <GrAdd />
            </button>
        </div>
    )
}
