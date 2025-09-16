import { Routes, Route } from 'react-router-dom'
import CadastroDeProduto from './Pages/Cadastro/CadastroDeProduto'
import ListagemDeProdutos from './Pages/Listagem/ListagemDeProdutos'
import EditarProduto from './Pages/Edicao/EditarProduto'


function App() {
  
  return (
    <>
      <Routes>
        <Route path='/' Component={CadastroDeProduto} />
        <Route path='/listagem' Component={ListagemDeProdutos} />
        <Route path='/editar/:id' Component={EditarProduto} />
      </Routes>
    </>
  )
}

export default App
