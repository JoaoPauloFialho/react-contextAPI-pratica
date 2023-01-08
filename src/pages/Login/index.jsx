import styles from './login.module.css'
import { useContext } from 'react'
import { LoginContext, useLoginContext } from '../../common/context/Login'
import { useNavigate } from 'react-router-dom'

export default function Login() {
    const {saldo, setSaldo, nome = '', setNome} = useLoginContext()
    const nav = useNavigate()
    const aoSalvar = (event) => {
        event.preventDefault()
        return nav('produtos')
        
    }

    return (
        <main>
            <form className={styles.login} onSubmit={event => aoSalvar(event)}>
                <p>Login</p>
                <input
                    id='login'
                    type='text'
                    value={nome}
                    onChange={event => setNome(event.target.value)}
                    placeholder='Digite o seu nome' />
                <p>Saldo</p>
                <input
                    type='number'
                    value={saldo}
                    onChange={event => setSaldo(event.target.value)}
                    placeholder='Digite seu saldo'
                />
                <button disabled={nome.length < 4} className={styles.button}>Logar</button>
            </form>
        </main>
    )
}