const express = require("express");
const mongoose = require("mongoose");
const userRoutes = require("./routes/userRoutes");
require("dotenv").config({ path: "../.env" });

const app = express();
const port = 3000;
const url = process.env.DB_URL;

//permissão para utilizar arquivos json nas requisições
app.use(express.json());

// tenta conectar ao banco de dados. se der erro, imprime o erro no console.

try {
  mongoose.connect(url);
  console.log("Connected to database");
} catch (err) {
  return console.log(err);
}

//define os middlewares das rotas
app.use("/users", userRoutes);

app.listen(port, () => {
  console.log("app listening on port ", port);
});
