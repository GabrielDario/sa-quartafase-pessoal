import './Home.css'
import logo from "./assets/Pessoinha.png"
import { Link } from 'react-router-dom'

function Home() {


  return (
    <>

      <div className='index'>
        <h1 className='titulo'>Index</h1>
        <div className='links'>
          <div className='lado'>
            <Link to={`/Epi`} className='link'>
              <h1>EPI</h1>
            </Link>
            <Link to={`/Funcionarios`} className='link'>
              <h1>Funcionarios</h1>
            </Link>
            <Link to={`/Cadastro`} className='link'>
              <h1>Administrar uso de epi</h1>
            </Link>
          </div>
          <div className='logo-div' >
            <img src={logo} className='logo-foto' />
          </div>
          <div className='lado'>
            <Link to={`/HEpi`} className='link'>
              <h1>Historico de uso de EPI</h1>
            </Link>
            <Link to={`/HFunc`} className='link'>
              <h1>Historico de uso de funcionario</h1>
            </Link>

          </div>
        </div>
      </div>

    </>
  )
}

export default Home
