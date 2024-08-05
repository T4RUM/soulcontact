import express from "express";
import mongoose from "mongoose";
import { config } from "dotenv";
import { contatosRouter } from "./routes/contatos.js";
import { usuariosRouter } from "./routes/usuarios.js";

config();

const app = express();

app.use(express.json());

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("Conectado ao Servidor MongoAtlas!");
  })
  .catch((err) => {
    console.error("Erro ao conectar ao MongoAtlas:", err);
  });

app.use(contatosRouter);
app.use(usuariosRouter);

app.listen(3000, () => {
  console.log("Servidor rodando em http://localhost:3000");
});
