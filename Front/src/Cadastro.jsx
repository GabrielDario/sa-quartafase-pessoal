import './Home.css'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';
const host = "http://localhost:3000";


function Cadastro() {
  const [retirada, setRetirada] = useState('')
  let [devolucao, setDevolucao] = useState('')
  const [Epis, setEpis] = useState([])
  const [Func, setFunc] = useState([])
  const [Rels, setRels] = useState([])
  const [idRel, setIdRel] = useState('')

  useEffect(() => {
    async function fetchDataEpi() {
      try {
        const response = await axios.post(`${host}/listarEpi`);
        let epiDisponiveis = []
        response.data.episResults.forEach(
          (item) => {
            if (item.disponibilidade == true) {
              epiDisponiveis.push(item)
            }
          }
        );
        setEpis(epiDisponiveis);
      } catch (error) {
        console.log('Erro ao obter dados do epi:', error);
      }
    }
    async function fetchDataFunc() {
      try {
        const response = await axios.post(`${host}/listarFunc`);
        setFunc(response.data.FuncResults);
      } catch (error) {
        console.log('Erro ao obter dados do func:', error);
      }
    }
    async function fetchDataRelat() {
      try {
        const response = await axios.post(`${host}/listarRelatorios`);
       
        setRels(response.data.relatorioResults);
      } catch (error) {
        console.log('Erro ao obter dados do func:', error);
      }
    }
    fetchDataEpi();
    fetchDataFunc();
    fetchDataRelat();
  }, []);

  function exRelatorioFront() {
    console.log(Rels)
    var selectRel = document.getElementById('selectRel');
    var idRel = selectRel.options[selectRel.selectedIndex].value;

    let acharItem = Rels.find(item => item.id == idRel)
    let idepi = acharItem.idepi;

    try {
      axios.delete(`${host}/exRelatorio/${idRel}/${idepi}`);
      alert("Dados Excluidos com sucesso!");
      window.location.reload();
    } catch (erro) {
      console.log('Erro ao excluir dados!')
    }
  }
  function addRelatorioFront() {
    var selectFunc = document.getElementById('selectFunc');
    var selectEpi = document.getElementById('selectEpi');
    var idfuncionario = selectFunc.options[selectFunc.selectedIndex].value;
    var idepi = selectEpi.options[selectEpi.selectedIndex].value;

    let pularMes = retirada.substring(5, 7);
    pularMes = Number(pularMes)
    devolucao = retirada.replace(pularMes, pularMes + 1)
    let dados = { idfuncionario, idepi, retirada, devolucao };

    if (retirada >= devolucao || idepi == '' || idfuncionario == '' || retirada == '' || devolucao == '') {
      alert("Dados inválidos");
      return;
    } else {
      try {
        axios.post(`${host}/addRelatorio`, dados);
        alert("Dados inseridos com sucesso");
        window.location.reload();
      } catch (error) {
        console.error('Erro ao enviar relatório:', error);

      }
    }

  }


  return (
    <>
      <div className='index'>
        <Link to={"/"}>
          <h1> Administrar uso de Epi</h1>
        </Link >

        <div className='todo'>
          <div className='divisa'>
            <div id="cadastrarEpi">
              <div >
                <h3>Funcionários: </h3>
                <select id="selectFunc">
                  {Func.map(func => (
                    <option key={func.id} value={func.id}>{func.nome}
                    </option>

                  ))}
                </select>
              </div>

              <div>
                <h3>Epis:</h3>
                {Epis.length > 0 ? <select id="selectEpi">
                  {Epis.map(epi => (
                    <option key={epi.id} value={epi.id}>{epi.nome}
                    </option>

                  ))}
                </select> : <h3>NENHUMA EPI DISPONIVEL OU CADASTRADA</h3>}

              </div>

              <div>
                <h3>Retirada:</h3>
                <input type='date' onChange={(evento) => setRetirada(evento.target.value)} />
              </div>
              {retirada == "" ? <h3>Pra devolver um mês depois</h3> : <h3>Para devolver {
                retirada.replace(retirada.substring(5, 7), Number(retirada.substring(5, 7)) + 1)
              }</h3>}


              <button className='adicionarEpi' onClick={addRelatorioFront}>
                <span>Adicionar</span>
              </button>
            </div>
          </div>
          <div className='divisa2'>
            <h1>Excluir Registro</h1>
            { Rels.length == 0 ? <h3>Nenhum epi vinculado</h3> :  <select id="selectRel">
                  {Rels.map(rels => (
                    <option key={rels.id} value={rels.id}>{rels.id}
                    </option>

                  ))}
                </select>}
           
            <br />
            <button className='adicionarEpi' onClick={exRelatorioFront}>
              <span>Excluir</span>
            </button>
          </div>

        </div >
      </div >
    </>
  )
}

export default Cadastro
