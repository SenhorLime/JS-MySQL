import express from "express";
import { createConnection } from "mysql";
import cors from "cors";

const app = express();

app.use(cors());

const connection = createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "loja",
});

connection.connect((err) => {
  if (err) {
    console.error("Erro ao conectar: ", err);
    return;
  }
  console.log("Conexão com o banco de dados MySQL estabelecida");
});

app.get("/quantidade-por-estoque/:valor", (req, res) => {
  const userInput = req.params.valor;
  const query = /* sql */ `CALL QuantidadePorEstoque(${userInput})`;

  connection.query(query, (error, results) => {
    if (error) {
      res.status(500).json({ error: error.message });
      return;
    }
    res.json({ results });
  });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor iniciado na porta ${PORT}`);
});
