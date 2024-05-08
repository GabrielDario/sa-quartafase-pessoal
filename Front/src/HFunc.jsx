import { useState } from 'react'
import './Home.css'
import { Link } from 'react-router-dom'
import axios from 'axios';
const host = "http://localhost:3000"




function HFunc() {
  const [id, setId] = useState(null)
  const [funcs, setFuncs] = useState([])



  async function buscar() {
    console.log(funcs)
    const dados = { id }
    try {
      const response = await axios.post(`${host}/hfunc`, dados); 
      console.log(response.data.registroConsulta);

      response.data.registroConsulta.forEach((item) => {
        let arrumar = item.retirada.substr(0, 10);
        let dia = arrumar.substr(8, 10)
        let mes = arrumar.substr(5, 2)
        let ano = arrumar.substr(0, 4)
        item.retirada = `${dia}/${mes}/${ano}`
  
        let arrumarDois = item.devolucao.substr(0, 10);
        let diaDois = arrumarDois.substr(8, 10)
        let mesDois = arrumarDois.substr(5, 2)
        let anoDois = arrumarDois.substr(0, 4)
        item.devolucao = `${diaDois}/${mesDois}/${anoDois}`
      })

      setFuncs(response.data.registroConsulta);
    } catch (error) {
      console.error('Erro ao obter dados do backend:', error);
    }

   
  }
  return (
    <div className='index'>
      <Link to={"/"}>
        < h1 > Historico de Funcionarios</h1>
      </Link >
      <div className='arrumar'>
        <h3 className='organizado'>Id Funcionario</h3>
        <input type='number' className='organizado' onChange={(evento) => setId(evento.target.value)} />
        <button className='organizado' onClick={buscar}>
          <span>Buscar</span>
        </button>
      </div>
      <div className='content'>
        <div>
          <div className='dadosEpi'>
            <div>ID</div>
            <div>Id Func</div>
            <div>Id epi</div>
            <div>Retirada</div>
            <div>Devolução</div>
          </div>
          <ul className='listar'>
            {funcs.map(func => (
              <li key={func.id}>
                <div className='organizar' >
                  <div className='org'>{func.id}</div>
                  <div className='org'>{func.idfuncionario}</div>
                  <div className='org'>{func.idepi}</div>
                  <div className='org'>{func.retirada}</div>
                  <div className='org'>{func.devolucao}</div>
                </div>
              </li>
            ))}
          </ul>
        </div>

      </div>

    </div>
  )
}

export default HFunc
