import { Router } from "express";
import { Usuario } from "../models/usuario.js";
import { usuarioValidation } from "../utils/validations.js";

export const usuariosRouter = Router();

// CRIAÇÃO DE USUÁRIO [POST]
usuariosRouter.post("/usuario", async (req, res) => {
  const { error, value } = usuarioValidation.validate(req.body, {
    abortEarly: false,
  });

  if (error) {
    return res.status(400).json({
      msg: "A requisição tem dados inválidos",
      error: error.details.map(err => err.message), // Retorna todos os erros
    });
  }

  const { nome, email, senha } = value;

  try {
    const novoUsuario = new Usuario({
      nome,
      email,
      senha,
    });
    await novoUsuario.save();
    res.status(200).json({ msg: "Usuário criado com sucesso!" });
  } catch (err) {
    res.status(500).json({ msg: "Um erro ocorreu" });
  }
});

// LISTAGEM DE USUÁRIOS [GET]
usuariosRouter.get("/usuario", async (req, res) => {
  try {
    const listaUsuarios = await Usuario.find();
    res.json(listaUsuarios);
  } catch (err) {
    res.status(500).json({ msg: "Erro do lado do servidor" });
  }
});

// LISTA UM USUÁRIO EM ESPECÍFICO
usuariosRouter.get("/usuario/:id", async (req, res) => {
  try {
    const usuario = await Usuario.findById(req.params.id);

    if (usuario) {
      res.json(usuario);
    } else {
      res.status(404).json({ msg: "Usuário não encontrado" });
    }
  } catch (err) {
    res.status(500).json({ msg: "Erro do lado do servidor" });
  }
});

// ATUALIZAÇÃO DE USUÁRIO [PUT]
usuariosRouter.put("/usuario/:id", async (req, res) => {
  const { error, value } = usuarioValidation.validate(req.body, {
    abortEarly: false,
  });

  if (error) {
    return res.status(400).json({
      msg: "A requisição tem dados inválidos",
      error: error.details.map(err => err.message), // Retorna todos os erros
    });
  }

  const { nome, email, senha } = value;
  try {
    const usuario = await Usuario.findByIdAndUpdate(
      req.params.id,
      {
        nome,
        email,
        senha,
      },
      { new: true }
    );

    if (usuario) {
      res.status(200).json({ msg: "Usuário atualizado com sucesso!" });
    } else {
      res.status(404).json({ msg: "Usuário não encontrado" });
    }
  } catch (err) {
    res.status(500).json({ msg: "Erro do lado do servidor" });
  }
});

// REMOÇÃO DE USUÁRIO [DELETE]
usuariosRouter.delete("/usuario/:id", async (req, res) => {
  try {
    const usuario = await Usuario.findByIdAndDelete(req.params.id);
    if (usuario) {
      res.status(200).json({ msg: "Usuário excluído com sucesso!" });
    } else {
      res.status(404).json({ msg: "Usuário não encontrado" });
    }
  } catch (err) {
    res.status(500).json({ msg: "Erro do lado do servidor" });
  }
});
