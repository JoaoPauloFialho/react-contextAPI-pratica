import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { CarrinhoContextProvide } from './common/context/Carrinho';
import { LoginContextProvider } from './common/context/Login';
import { PagamentoProvider } from './common/context/Pagamento';
import Header from './components/Header';
import Rodape from './components/Rodape';
import Carrinho from './pages/Carrinho';
import Login from './pages/Login';
import Produtos from './pages/ProdutosPage';

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Header />
      <LoginContextProvider>
        <CarrinhoContextProvide>
          <PagamentoProvider>
            <Routes>
              <Route path='/' element={<Login />} />
              <Route path='produtos' element={<Produtos />} />
              <Route path='carrinho' element={<Carrinho />} />
            </Routes>
          </PagamentoProvider>
        </CarrinhoContextProvide>
      </LoginContextProvider>
      <Rodape />
    </BrowserRouter>
  );
}
