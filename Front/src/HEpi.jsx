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

        relatorioResults.forEach((item) => {
          let arrumar = item.retirada.substr(0, 10);
          let dia = arrumar.substr(8, 10)
          let mes = arrumar.substr(5, 2)
          let ano = arrumar.substr(0, 4)
          item.retirada = `${dia}/${mes}/${ano}`
        })
        let novaLista = [];
        for (let i = 0; i < relatorioResults.length ; i++) {
          let { nome: acharNome } = FuncResults.find(element => element.id == relatorioResults[i].idfuncionario);
          let { nome: acharEpi } = episResults.find(element => element.id == relatorioResults[i].idepi);
          novaLista.push({
            id: episResults[i].id,
            idfuncionario: relatorioResults[i].idfuncionario,
            nomeFunc: acharNome,
            idepi: relatorioResults[i].idepi,
            nomeEpi: episResults[i].nome,
            codigo: acharEpi,
            regEntrada: relatorioResults[i].retirada,
          })


        }
        novaLista.sort( (x,y) => {
          return x.idepi - y.idepi;
        })
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

  }
  function voltar() {
    window.location.reload();
  }
  return (
    <div className='index'>
      <Link to={"/"}>
        < h1 > Historico de Epis Ocupado</h1>
      </Link >
      <div className='arrumar'>
        <h3 className='organizado'>ID Epi's</h3>
        <input type='number' id="BuscarHistoricoEpi" className='organizado' onChange={(evento) => setId(evento.target.value)} />
        <button className='organizado' onClick={buscarEpi}>
          <span>Buscar</span>
        </button>
        <button className='organizado' onClick={voltar}>
          <span>Mostrar Todos</span>
        </button>
      </div>
      <div className='content'>
        <div className='dadosEpi'>
          <div>ID do EPI</div>
          <div>Nome do EPI</div>
          <div>Código</div>
          <div>IdFunc</div>
          <div>Nome Funcionário</div>
          <div>Registro de Entrada</div>
        </div>
        <ul className='listar1'>

          {juncao.length > 0 ?juncao.map(juncao => (
            <li key={juncao.id}>
              <div className='organizar1'>
                <div className='reIdEpi'>{juncao.idepi}</div>
                <div className='reIdEpi'>{juncao.nomeEpi}</div>
                <div className='reIdEpi'>{juncao.codigo}</div>
                <div className='reIdFunc'>{juncao.idfuncionario}</div>
                <div className='reNomeFunc'>{juncao.nomeFunc}</div>
                <div className='reRetirada'>{juncao.regEntrada}</div>
              </div>
            </li>
          )): <h1>Nenhum EPI Vinculado Cadastrado</h1> }
        </ul>
      </div>
    </div>
  )
}

export default HEpi
