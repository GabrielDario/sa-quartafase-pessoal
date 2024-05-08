import { ValidationError } from 'sequelize';
import Epis from '../models/Epis.js'
import Funcionario from "../models/Funcionarios.js";
import Relatorios from "../models/Relatorios.js";
const addFunc = async (req, res) => {
    try {
        const { nome, cpf, cargo } = req.body

        if (!nome || !cpf || !cargo) return res.status(404).send({ mensagem: 'Informações incompletas' })
        const funcCadastrado = await Funcionario.create({ nome, cpf, cargo })
        res.status(201).send({ funcCadastrado })
    } catch (erro) {
        console.log(erro)
        res.status(404).send({ mensagem: 'Erro ao inserir funcionario' })
    }
}

const listarFunc = async (req, res) => {
    try {
        const FuncResults = await Funcionario.findAll()
        res.status(200).send({ FuncResults })

    } catch (erro) {
        console.log(erro)
        res.status(404).send({ mensagem: 'Erro ao listar' })
    }
}
const apagarFunc = async (req, res) => {
    console.log('BACKENDD')
    
    try {
        const { id } = req.params
        await Funcionario.destroy({ where: { id } })
        res.status(200).send({ mensagem: 'excluido' })
    } catch (erro) {
        console.log(erro)
        res.status(404).send({ mensagem: 'Erro ao apagar' })
    }
}

const editarFunc = async (req, res) => {
    try {
        const { id, nome, cargo, cpf } = req.body
        const apiAtuaizado = await Funcionario.update({ nome, cargo, cpf }, { where: { id } })
        res.status(200).send({ apiAtuaizado })
    } catch (erro) {
        console.log(erro)
        res.status(404).send({ mensagem: 'Erro ao atualizar' })
    }
}

const addEpis = async (req, res) => {
    try {
        const { nome, codigo, validade } = req.body
        let disponibilidade = true;

        if (!nome || !codigo || !validade) return res.status(404).send({ mensagem: 'Informações incompletas' })
        const epiCadastrado = await Epis.create({ nome, codigo, validade, disponibilidade })
        res.status(201).send({ epiCadastrado })
    } catch (erro) {
        console.log(erro)
        res.status(404).send({ mensagem: 'Erro ao inserir epi' })
    }
}


const listarEpi = async (req, res) => {

    try {
        const episResults = await Epis.findAll()
        res.status(200).send({ episResults })

    } catch (erro) {
        console.log(erro)
        res.status(404).send({ mensagem: 'Erro ao listar' })
    }
}

const editarEpi = async (req, res) => {
    try {
        const { id, nome, codigo, validade } = req.body

        const apiAtuaizado = await Epis.update({ nome, codigo, validade }, { where: { id } })
        res.status(200).send({ apiAtuaizado })
    } catch (erro) {
        console.log(erro)
        res.status(404).send({ mensagem: 'Erro ao atualizar' })
    }
}

const apagarEpi = async (req, res) => {
    try {
        const { id } = req.params
        await Epis.destroy({ where: { id } })
        res.status(200).send({ mensagem: 'excluido' })
    } catch (erro) {
        console.log(erro)
        res.status(404).send({ mensagem: 'Erro ao apagar' })
    }
}
const addRelatorio = async (req, res) => {
    console.log('ADD RELATORIO!')
    try {
        let { idfuncionario, idepi, retirada, devolucao } = req.body
        await Relatorios.create({ idfuncionario, idepi, retirada, devolucao })

        let disponibilidade = false

        let apiAtuaizado = await Epis.update({ disponibilidade }, { where: { id: idepi } })

        res.status(201).send({ apiAtuaizado })
    } catch (erro) {
        console.log(erro)
        res.status(404).send({ mensagem: 'Erro ao inserir funcionario' })
    }
};

const listarRelatorios = async (req, res) => {
    try {
        const relatorioResults = await Relatorios.findAll()
        res.status(200).send({ relatorioResults })

    } catch (erro) {
        console.log(erro)
        res.status(404).send({ mensagem: 'Erro ao listar Relatorios' })
    }
}

const listarHistoricoFunc = async (req, res) => {
    const { id } = req.body
    try {
        const registroConsulta = await Relatorios.findAll({ where: { idfuncionario: id } })
        res.status(200).send({ registroConsulta })
    } catch (erro) {
        console.log(erro)
        res.status(404).send({ mensagem: 'Erro ao listar ou Funcionario não localizado' })
    }
}

const exRelatorio = async (req, res) => {

    let disponibilidade = true
    const { idRel } = req.params
    const { idEpi } = req.params
    console.log(`foi back ${idRel} e ${idEpi}`)
    try {
        await Relatorios.destroy({ where: { id: idRel } })
        let apiAtuaizadoNovo = await Epis.update({ disponibilidade }, { where: { id: idEpi } })
        console.log(apiAtuaizadoNovo)
        res.status(201).send({ apiAtuaizadoNovo })
    }
    catch (erro) {
        console.log("Deu errado")
        console.log(erro)
        res.status(404).send({ mensagem: 'Erro ao apagar registro' })
    }
}

export {
    addFunc,
    listarFunc,
    editarFunc,
    apagarFunc,
    addEpis,
    listarEpi,
    editarEpi,
    apagarEpi,
    addRelatorio,
    listarRelatorios,
    listarHistoricoFunc,
    exRelatorio
}