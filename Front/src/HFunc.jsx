import { useState, useEffect } from 'react'
import './Home.css'
import { Link } from 'react-router-dom'
import axios from 'axios';
const host = "http://localhost:3000"


function HFunc() {
  const [id, setId] = useState(null)
  const [funcs, setFuncs] = useState([])
  const [juncao, setJuncao] = useState([])
  const [juncaoPermanente, setJuncaoPermanente] = useState([])
  const [Func, setFunc] = useState([])

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.post(`${host}/listarRelatorios`);
        const responseEpi = await axios.post(`${host}/listarEpi`);
        const responseFunc = await axios.post(`${host}/listarFunc`);

        let relatorioResults = response.data.relatorioResults;
        let episResults = responseEpi.data.episResults;
        let FuncResults = responseFunc.data.FuncResults;

        relatorioResults.forEach((item) => {
          let arrumar = item.retirada.substr(0, 10);
          let dia = arrumar.substr(8, 10)
          let mes = arrumar.substr(5, 2)
          let ano = arrumar.substr(0, 4)
          item.retirada = `${dia}/${mes}/${ano}`
        })
        let novaLista = [];
        for (let i = 0; i < relatorioResults.length; i++) {
          let idFunc = relatorioResults[i].idfuncionario
          let acharNome = FuncResults.find((element) => element.id == idFunc);
          acharNome = acharNome.nome
          novaLista.push({
            id: i,
            idfuncionario: idFunc,
            nomeFunc: acharNome,
            idepi: relatorioResults[i].idepi,
            nomeEpi: episResults[i].nome,
            regEntrada: relatorioResults[i].retirada,
          })


        }
        novaLista.sort((x, y) => {
          return x.idfuncionario - y.idfuncionario;
        })
        setJuncao(novaLista);
        setJuncaoPermanente(novaLista);
      } catch (error) {
        console.error('Erro ao obter dados do backend:', error);
      }
    }
    async function fetchDataFunc() {
      try {
        const response = await axios.post(`${host}/listarFunc`);
        console.log(response.data.FuncResults)
        setFunc(response.data.FuncResults);
      } catch (error) {
        console.log('Erro ao obter dados do func:', error);
      }
    }
    fetchData();
    fetchDataFunc();
  }, []);

  function buscar() {
    let id = document.getElementById("selectFunc").value;

    let novaLista = juncaoPermanente.filter((item) => item.idfuncionario == id)
    setJuncao(novaLista)


  }

  function voltar() {
    window.location.reload();
  }
  return (
    <div className='index'>
      <Link to={"/"}>
        < h1 > Historico de Funcionarios Com Epi</h1>
      </Link >
      <div className='arrumar'>
        <h3 className='organizado'>Filtrar Funcionário</h3>
        <select id="selectFunc">
          {Func.map(func => (
            <option key={func.id} value={func.id}>{func.nome}
            </option>

          ))}
        </select>
        &nbsp; &nbsp;
        &nbsp; &nbsp;
        <button className='organizado' onClick={buscar}>
          <span>Buscar</span>
        </button>
      
        <button className='organizado' onClick={voltar}>
          <span>Mostrar Todos</span>
        </button>
      </div>
      
      <div className='content'>
        <div>
          <div className='dadosEpi'>
            <div>Id Func</div>
            <div>Nome Func</div>
            <div>Id epi</div>
            <div>Retirada</div>
            <div>Devolução</div>
          </div>
          <ul className='listar'>
            {juncao.length > 0 ? juncao.map(juncao => (
              <li key={juncao.id}>
                <div className='organizar1'>
                  <div className='reIdFunc'>{juncao.idfuncionario}</div>
                  <div className='reNomeFunc'>{juncao.nomeFunc}</div>
                  <div className='reIdEpi'>{juncao.idepi}</div>
                  <div className='reIdEpi'>{juncao.nomeEpi}</div>
                  <div className='reRetirada'>{juncao.regEntrada}</div>
                </div>
              </li>
            )) : <h1>Nenhum Funcionário cadastrado</h1>}
          </ul>
        </div>

      </div>

    </div>
  )
}

export default HFunc
