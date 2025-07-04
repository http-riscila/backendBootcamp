const { body } = require('express-validator');


const validateCreateProposal = [
  body('title')
    .notEmpty().withMessage('The title is mandatory.')
    .isString().withMessage('The title should be a string.'),
  body('description')
    .notEmpty().withMessage('The description is mandatory.')
    .isString().withMessage('The description must be a string.'),
  body('communityId')
    .notEmpty().withMessage('The community ID is mandatory.')
    .isInt().withMessage('The community ID must be a whole number.'),
  
];


const validateUpdateProposal = [
  body('title')
    .optional()
    .isString().withMessage('The title should be a string.'),
  body('description')
    .optional()
    .isString().withMessage('The description must be a string.'),
  
];

module.exports = {
  validateCreateProposal,
  validateUpdateProposal,
};
