import { Routes, Route } from 'react-router-dom'
import CadastroDeProduto from './Pages/Cadastro/CadastroDeProduto'

function App() {
  
  return (
    <>
      <Routes>
        <Route path='/' Component={CadastroDeProduto} />
      </Routes>
    </>
  )
}

export default App
