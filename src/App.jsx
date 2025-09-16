import { Routes, Route } from 'react-router-dom'
import CadastroDeProduto from './Pages/Cadastro/CadastroDeProduto'
import ListagemDeProdutos from './Pages/Listagem/ListagemDeProdutos'


function App() {
  
  return (
    <>
      <Routes>
        <Route path='/' Component={CadastroDeProduto} />
        <Route path='/listagem' Component={ListagemDeProdutos} />
      </Routes>
    </>
  )
}

export default App
