import sequelize from "../dataBase/database.js"
import { DataTypes } from "sequelize"

const Relatorios = sequelize.define('Relatorios', {

    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    idfuncionario: {
        type: DataTypes.INTEGER
    },
    idepi: {
        type: DataTypes.INTEGER
    },
    retirada: {
        type: DataTypes.DATE
    },
    devolucao: {
        type: DataTypes.DATE
    },
}, {
    timestamps: false
})

export default Relatorios 