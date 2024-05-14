import './Home.css'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios';
import { format } from 'date-fns';
const host = "http://localhost:3000"

function HEpi() {
  const [juncao, setJuncao] = useState([])
  const [juncaoPermanente, setJuncaoPermanente] = useState([])
  const [id, setId] = useState([])
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.post(`${host}/listarRelatorios`);
        const responseEpi = await axios.post(`${host}/listarEpi`);
        const responseFunc = await axios.post(`${host}/listarFunc`);

        let relatorioResults = response.data.relatorioResults;
        let episResults = responseEpi.data.episResults;
        let FuncResults = responseFunc.data.FuncResults;

        console.log(FuncResults)
        console.log(relatorioResults)
        console.log(episResults)
        relatorioResults.forEach((item) => {
          let arrumar = item.retirada.substr(0, 10);
          let dia = arrumar.substr(8, 10)
          let mes = arrumar.substr(5, 2)
          let ano = arrumar.substr(0, 4)
          item.retirada = `${dia}/${mes}/${ano}`
        })
        let novaLista = [];
        let x = 'x'
        let sim = 'Sim';
        for (let i = 0; i < episResults.length ; i++) {
          let achar = false;

          achar = true;
          novaLista.push({
            id: episResults[i].id,
            idfuncionario: relatorioResults[i].idfuncionario,
            nomeFunc: FuncResults[i].nome,
            idepi: relatorioResults[i].idepi,
            nomeEpi: episResults[i].nome,
            regEntrada: relatorioResults[i].retirada,
            disponibilidade: 'Não'
          })

          if (achar == false) {
            novaLista.push({
              id: episResults[i].id,
              idfuncionario: x,
              nomeFunc: x,
              idepi: x,
              nomeEpi: x,
              regEntrada: x,
              disponibilidade: sim
            })
          }

        }
        console.log(novaLista)
        setJuncao(novaLista);
        setJuncaoPermanente(novaLista);

      } catch (error) {
        console.error('Erro ao obter dados do backend:', error);
      }
    }

    fetchData();
  }, []);

  const buscarEpi = async (req, res) => {

    console.log('BUSCANDO EPI front');


    let achouId = false;
    juncaoPermanente.forEach((item) => {
      if (item.id == id) {
        achouId = true;
      }
    });


    if (id == null || achouId == false) {
      alert("Id vazio ou Inválido");
      return;
    }
    const procurar = juncaoPermanente.find((element) => element.id == id);
    setJuncao([procurar])
    console.log(procurar)

  }

  return (
    <div className='index'>
      <Link to={"/"}>
        < h1 > Historico de Epis</h1>
      </Link >
      <div className='arrumar'>
        <h3 className='organizado'>ID Epi's</h3>
        <input type='number' id="BuscarHistoricoEpi" className='organizado' onChange={(evento) => setId(evento.target.value)} />
        <button className='organizado' onClick={buscarEpi}>
          <span>Buscar</span>
        </button>
      </div>
      <div className='content'>
        <div className='dadosEpi'>
          <div>IdFunc</div>
          <div>Nome Funcionário</div>
          <div>IdEpi</div>
          <div>nome do epi</div>
          <div>regEntrada</div>
          <div>Disponível</div>
        </div>
        <ul className='listar1'>

          {juncao.map(juncao => (
            <li key={juncao.id}>
              <div className='organizar1'>
                <div className='reIdFunc'>{juncao.idfuncionario}</div>
                <div className='reNomeFunc'>{juncao.nomeFunc}</div>
                <div className='reIdEpi'>{juncao.idepi}</div>
                <div className='reIdEpi'>{juncao.nomeEpi}</div>
                <div className='reRetirada'>{juncao.regEntrada}</div>
                <div className='reIdEpi'>{juncao.disponibilidade}</div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default HEpi
