import cors from "cors"
import express from "express";
import sequelize from './dataBase/database.js'
import router from "./routers/router.js"
const port = 3000;
const app = express();

// try {
//     await sequelize.sync()
// } catch (erro) {
//     console.log(erro)
// }

app.use(cors());

app.use(express.json());

app.use(router)

app.listen(port, () => {
    console.log("Servidor esta disponivel")
})
