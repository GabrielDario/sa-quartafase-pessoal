import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Home from './Home.jsx'
import Epi from './Epis.jsx'
import Func from './Func.jsx'
import HEpi from './HEpi.jsx'
import HFunc from './HFunc.jsx'
import Cadastro from './Cadastro.jsx'


const paginas = createBrowserRouter([
  { path: '/', element: <Home /> },
  { path: '/Epi', element: <Epi /> },
  { path: '/Funcionarios', element: <Func /> },
  { path: '/Cadastro', element: <Cadastro /> },
  { path: '/HEpi', element: <HEpi /> },
  { path: '/HFunc', element: <HFunc /> },



])

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={paginas}></RouterProvider>,
)
