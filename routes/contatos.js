import { Router } from "express";
import { Contato } from "../models/contato.js";
import { contatoValidation } from "../utils/validations.js";

export const contatosRouter = Router();

// CRIAÇÃO DE CONTATO [POST]
contatosRouter.post("/contatos", async (req, res) => {
  const { error, value } = contatoValidation.validate(req.body, {
    abortEarly: false,
  });

  if (error) {
    res.status(400).json({
      msg: "A requisição tem dados inválidos",
      error: error.details[0].message,
    });
    return;
  }

  const { nome, sobrenome, email, telefone, obeservacao, favorito } = value;

  try {
    const novoContato = new Contato({
      nome,
      sobrenome,
      email,
      telefone,
      obeservacao,
      favorito,
    });
    await novoContato.save();
    res.status(200).json({ msg: "Contato criado com sucesso!" });
  } catch (err) {
    res.status(500).json({ msg: "Um erro ocorreu" });
  }
});

// LISTAGEM DE CONTATO [GET]
contatosRouter.get("/contatos", async (req, res) => {
  const listaContatos = await Contato.find(); // No mongoose é só find
  res.json(listaContatos);
});

// LISTA UM CONTATO EM ESPECÍFICO
contatosRouter.get("/contatos/:id", async (req, res) => {
  const contato = await Contato.findById(req.params.id);

  if (contato) {
    res.json(contato);
  } else {
    res.status(404).json({ msg: "Contato não encontrado" });
  }
});

// ATUALIZAÇÃO DE CONTATO [PUT]
contatosRouter.put("/contatos/:id", async (req, res) => {
  const { error, value } = contatoValidation.validate(req.body, {
    abortEarly: false,
  });

  if (error) {
    res.status(400).json({
      msg: "A requisição tem dados inválidos",
      error: error.details[0].message,
    });
    return;
  }

  const { nome, sobrenome, email, telefone, obeservacao, favorito } = value;
  try {
    const contato = await Contato.findByIdAndUpdate(req.params.id, {
      nome,
      sobrenome,
      email,
      telefone,
      obeservacao,
      favorito,
    }, { new: true });

    if (contato) {
      res.status(200).json({ msg: "Contato atualizado com sucesso!" });
    } else {
      res.status(404).json({ msg: "Contato não encontrado" });
    }
  } catch (err) {
    res.status(500).json({ msg: "Erro do lado do servidor!" });
  }
});

// REMOÇÃO DE CONTATO [DELETE]
contatosRouter.delete("/contatos/:id", async (req, res) => {
  try {
    const contato = await Contato.findByIdAndDelete(req.params.id);
    if (contato) {
      res.status(200).json({ msg: "Contato excluído com sucesso!" });
    } else {
      res.status(404).json({ msg: "Contato não encontrado" });
    }
  } catch (err) {
    res.status(500).json({ msg: "Erro do lado do servidor" });
  }
});
