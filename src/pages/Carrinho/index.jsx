import { useContext } from 'react'
import { useNavigate } from 'react-router'
import { useCarrinhoContext } from '../../common/context/Carrinho'
import { LoginContext, useLoginContext } from '../../common/context/Login'
import { usePagamentoContext } from '../../common/context/Pagamento'
import Produto from '../../components/Produto'
import styles from './carrinho.module.css'

export default function Carrinho(props) {
    const { carrinho, quantidade, total=0, efetuarCompra} = useCarrinhoContext()
    const {saldo} = useLoginContext()
    const { tipoPagamento, tiposPagamento, mudaPagamento } = usePagamentoContext()
    const nav = useNavigate()
    return (
        <section className={styles.carrinho}>
            <button onClick={() => nav(-1)}>Voltar</button>
            <h1>PRODUTOS NO CARRINHO  {quantidade}</h1>
            {quantidade === 0 ?
                <p>Carrinho vazio</p> :
                carrinho.map(produto => <Produto key={produto.id} produto={produto} />)
            }
            <select name='select' onChange={event => mudaPagamento(event.target.value)}>
                {tiposPagamento.map(pagamento => (
                    <option value={pagamento.id} key={pagamento.id}>
                        {pagamento.nome}
                    </option>
                ))}
            </select>
            {tipoPagamento.nome}
            <p>Total R$ {total.toFixed(2)}</p>
            <p>Saldo R$ {saldo}</p>
            <p>Saldo totalR$ {(saldo-total).toFixed(2)}</p>
            <button onClick={() => efetuarCompra()} disabled={total === 0 || (saldo-total) < 0}>Comprar</button>
        </section>
    )
}