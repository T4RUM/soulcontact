import { model, Schema } from "mongoose";

export const Usuario = model("usuario", new Schema({
  nome: {
    type: String,
    required: true,
    trim: true, 
  },
  email: {
    type: String,
    required: true,
    unique: true, 
    lowercase: true, 
    match: [/.+@.+\..+/, "Por favor, insira um email válido"], 
  },
  senha: {
    type: String,
    required: true,
    minlength: 6, 
  },
}));