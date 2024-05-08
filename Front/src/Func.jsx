import './Home.css'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';
const host = "http://localhost:3000"

function Func() {
  const [nome, setNome] = useState(null)
  const [cpf, setCpf] = useState(null)
  const [cargo, setCargo] = useState(null)
  const [id, setId] = useState(null)
  const [funcs, setFuncs] = useState([])

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.post(`${host}/listarFunc`);
        setFuncs(response.data.FuncResults);
      } catch (error) {
        console.error('Erro ao obter dados do backend:', error);
      }
    }
    fetchData();
  }, []);



  function adicionar() {//perfeito
    if (nome == null || cpf == null || cargo == null) {
      alert("Faltando dados!");
      return;
    }
    const dados = { nome, cpf, cargo }
    axios.post(`${host}/addFunc`, dados)
    alert('Salvo com sucesso!');
    window.location.reload();
  }


  function editar() {
    const dadosEdit = { id, nome, cpf, cargo }
    document.getElementById("EditarFuncNome").value = '';
    document.getElementById("EditarFuncCpf").value = '';
    document.getElementById("EditarFuncCargo").value = '';
    document.getElementById("EditarFuncId").value = '';
    if (nome != null && cpf != null && cargo != null && id != null) {
      axios.put(`${host}/editarFunc`, dadosEdit)
      alert("Funcionario editado com sucesso");
      window.location.reload();
    } else {
      alert("Erro ao editado funcionario");
    }


  }

  function apagar() {
    let achouId = false;
    funcs.forEach((item) => {
      if (item.id == id) {
        achouId = true;
      }
    });

    if (achouId == false || id == null) {
      alert("Falha ao remover Funcionário")
      return;
    } else {
      alert("REMOVIDO");

      try {
        axios.delete(`${host}/apagarFunc/${id}`)
      } catch (erro) {
        console.log('ERRO AO APAGAR Funcionario')
      }
      window.location.reload()

    }
  }


  function listarBackendFunc() {
    axios.post(`${host}/listarFunc`)
  }



  function cadastrarAba() {
    let btnCadastrar = document.getElementById("btnCadastrar");
    let btnListar = document.getElementById("btnListar");
    let btnEditar = document.getElementById("btnEditar");
    let btnRemover = document.getElementById("btnRemover");

    let cadastroFunc = document.getElementById("cadastrarFunc");
    let listarFunc = document.getElementById("listarFunc");
    let excluirFunc = document.getElementById("excluirFunc");
    let editarFunc = document.getElementById("editarFunc");

    btnCadastrar.style.backgroundColor = "white";
    btnListar.style.backgroundColor = "darkgray";
    btnEditar.style.backgroundColor = "darkgray";
    btnRemover.style.backgroundColor = "darkgray";

    cadastroFunc.style.display = "block";
    listarFunc.style.display = "none";
    excluirFunc.style.display = "none";
    editarFunc.style.display = "none";
  }
  function listarAba() {
    let btnCadastrar = document.getElementById("btnCadastrar");
    let btnListar = document.getElementById("btnListar");
    let btnEditar = document.getElementById("btnEditar");
    let btnRemover = document.getElementById("btnRemover");

    let cadastroFunc = document.getElementById("cadastrarFunc");
    let listarFunc = document.getElementById("listarFunc");
    let excluirFunc = document.getElementById("excluirFunc");
    let editarFunc = document.getElementById("editarFunc");


    btnCadastrar.style.backgroundColor = "darkgray";
    btnListar.style.backgroundColor = "white";
    btnEditar.style.backgroundColor = "darkgray";
    btnRemover.style.backgroundColor = "darkgray";

    cadastroFunc.style.display = "none";
    listarFunc.style.display = "block";
    excluirFunc.style.display = "none";
    editarFunc.style.display = "none";
    listarBackendFunc();
  }

  function editarAba() {
    let btnCadastrar = document.getElementById("btnCadastrar");
    let btnListar = document.getElementById("btnListar");
    let btnEditar = document.getElementById("btnEditar");
    let btnRemover = document.getElementById("btnRemover");

    let cadastroFunc = document.getElementById("cadastrarFunc");
    let listarFunc = document.getElementById("listarFunc");
    let excluirFunc = document.getElementById("excluirFunc");
    let editarFunc = document.getElementById("editarFunc");


    btnCadastrar.style.backgroundColor = "darkgray";
    btnListar.style.backgroundColor = "darkgray";
    btnEditar.style.backgroundColor = "white";
    btnRemover.style.backgroundColor = "darkgray";

    cadastroFunc.style.display = "none";
    listarFunc.style.display = "none";
    excluirFunc.style.display = "none";
    editarFunc.style.display = "block";
  }
  function removerAba() {
    let btnCadastrar = document.getElementById("btnCadastrar");
    let btnListar = document.getElementById("btnListar");
    let btnEditar = document.getElementById("btnEditar");
    let btnRemover = document.getElementById("btnRemover");

    let cadastroFunc = document.getElementById("cadastrarFunc");
    let listarFunc = document.getElementById("listarFunc");
    let excluirFunc = document.getElementById("excluirFunc");
    let editarFunc = document.getElementById("editarFunc");


    btnCadastrar.style.backgroundColor = "darkgray";
    btnListar.style.backgroundColor = "darkgray";
    btnEditar.style.backgroundColor = "darkgray";
    btnRemover.style.backgroundColor = "white";

    cadastroFunc.style.display = "none";
    listarFunc.style.display = "none";
    excluirFunc.style.display = "block";
    editarFunc.style.display = "none";
  }


  return (
    <>
      <div className='index'>
        <Link to={"/"}>
          <h1> Funcionarios</h1>
        </Link >
        <div className='navFuncGeral'>
          <button className='navFunc' id="btnCadastrar" onClick={cadastrarAba}>Cadastrar</button>
          <button className='navFunc2' id="btnListar" onClick={listarAba}>Listar</button>
          <button className='navFunc3' id="btnEditar" onClick={editarAba}>Editar</button>
          <button className='navFunc4' id="btnRemover" onClick={removerAba}>Remover</button>
        </div>
        <div className='content'>
          <div className='cadastroFunc' id="cadastrarFunc">

            <div>
              <h2>Nome: </h2>
              <input type='text' id="adicionarFuncNome" onChange={(evento) => setNome(evento.target.value)} />
            </div>

            <div>
              <h2>CPF:</h2>
              <input type="number" id="adicionarFuncCpf" onChange={(evento) => setCpf(evento.target.value)} />
            </div>

            <div>
              <h2>Cargo:</h2>
              <input type='text' id="adicionarFuncCargo" onChange={(evento) => setCargo(evento.target.value)} />
            </div>
            <button className='adicionarFunc' onClick={adicionar}>
              <span>Adicionar</span>
            </button>
          </div>

          <div className='listarFunc' id="listarFunc">
            <div className='dadosEpi'>
              <div>ID</div>
              <div>Nome</div>
              <div>CPF</div>
              <div>Cargo</div>
            </div>
            <ul className='listar'>
              {funcs.map(func => (
                <li key={func.id}>
                  <div className='organizar' >
                    <div className='org'>{func.id}</div>
                    <div className='org'>{func.nome}</div>
                    <div className='org'>{func.cpf}</div>
                    <div className='org'>{func.cargo}</div>
                  </div>
                </li>
              ))}
            </ul>
          </div>



          <div className='editarFunc' id="editarFunc">

            <div>
              <h2>Id a modificar: </h2>
              <input type='number' id='EditarFuncId' onChange={(evento) => setId(evento.target.value)} />
            </div>

            <div>
              <h2>Nome: </h2>
              <input type='text' id='EditarFuncNome' onChange={(evento) => setNome(evento.target.value)} />
            </div>

            <div>
              <h2>CPF:</h2>
              <input type='number' id='EditarFuncCpf' onChange={(evento) => setCpf(evento.target.value)} />
            </div>

            <div>
              <h2>Cargo:</h2>
              <input type='text' id='EditarFuncCargo' onChange={(evento) => setCargo(evento.target.value)} />
            </div>
            <button className='adicionarFunc' onClick={editar}>
              <span>Adicionar</span>
            </button>
          </div>

          <div className='excluirFunc' id="excluirFunc">
            <h1>Excluir por Id</h1>
            <input type='number' id="apagarFuncId" onChange={(evento) => setId(evento.target.value)} />
            <button onClick={apagar}>
              <span>Apagar</span>
            </button>
          </div>

        </div>
      </div >
    </>
  )
}

export default Func
