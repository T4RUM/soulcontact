import Joi from "joi";

// Validação para a inserção / atualização de um contato

export const contatoValidation = Joi.object({
  nome: Joi.string().max(150).required(),
  sobrenome: Joi.string().max(150),
  email: Joi.string().email(),
  telefone: Joi.string().required(),
  obeservacao: Joi.string().max(200),
  favorito: Joi.boolean(),
});



export const usuarioValidation = Joi.object({
  nome: Joi.string()
    .max(150)
    .required()
    .messages({
      'string.empty': 'O nome é obrigatório',
      'string.max': 'O nome deve ter no máximo 150 caracteres',
    }),
  email: Joi.string()
    .email()
    .required()
    .messages({
      'string.empty': 'O email é obrigatório',
      'string.email': 'O email deve ser um endereço válido',
    }),
  senha: Joi.string()
    .min(6)
    .required()
    .messages({
      'string.empty': 'A senha é obrigatória',
      'string.min': 'A senha deve ter pelo menos 6 caracteres',
    }),
});
