const { body } = require('express-validator');

// Validação para criação de proposal
const validateCreateProposal = [
  body('title')
    .notEmpty().withMessage('O título é obrigatório.')
    .isString().withMessage('O título deve ser uma string.'),
  body('description')
    .notEmpty().withMessage('A descrição é obrigatória.')
    .isString().withMessage('A descrição deve ser uma string.'),
  body('communityId')
    .notEmpty().withMessage('O ID da comunidade é obrigatório.')
    .isInt().withMessage('O ID da comunidade deve ser um número inteiro.'),
  // Adicione outros campos conforme necessário
];

// Validação para atualização de proposal (exemplo)
const validateUpdateProposal = [
  body('title')
    .optional()
    .isString().withMessage('O título deve ser uma string.'),
  body('description')
    .optional()
    .isString().withMessage('A descrição deve ser uma string.'),
  // Adicione outros campos opcionais conforme necessário
];

module.exports = {
  validateCreateProposal,
  validateUpdateProposal,
};
