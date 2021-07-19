require("dontenv").config();

const express = require("express");

const connectToDb = require("./config/db.config");
const userRouter = require("./routes/user.routes");

const app = express();

app.use(express.json());

async function init() {
    try {
        await connectToDb();

        console.log("conectado ao banco de dados");

        //o que significa userrouter ???
        app.use("/", userRouter);
        //esse seria o next , por que tem que chamar atravez de callback
        app.use((err, req, res) => {
            if (err) {
                return res.status(500).josn({error: err});
            }
        });
        app.listen(4000, () => console.log("servidor rodando na porta 4000"));
    } catch (err) {
        console.log("erro ao conectar", err);
        // nao entendi process exit ???
        process.exit(1);
    }
}

//nao entendi init()??


init()