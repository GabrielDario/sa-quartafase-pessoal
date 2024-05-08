import { Sequelize } from 'sequelize'
//Nikolas
// const sequelize = new Sequelize('postgres://pooqbkmy:zVazK2zFLz-B-RguhEtvol8Xbfx4Cwm4@isabelle.db.elephantsql.com/pooqbkmy')

//Gabriel
const sequelize = new Sequelize('postgres://hwpivqfw:pdS05tdj99xuoQjCUlOirSP8N1Dg9PLn@kesavan.db.elephantsql.com/hwpivqfw')

try {
    await sequelize.authenticate()
    console.log('Conectado com sucesso')
 } catch (erro) {
     console.log('Erro ao conectar banco de dados')
     console.log(erro)
 }

export default sequelize;
