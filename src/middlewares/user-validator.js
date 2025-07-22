import { body } from "express-validator";

// Validador para atualização de usuário
export const validateUpdateUser = [
  body("name")
    .optional({ checkFalsy: true })
    .trim()
    .isLength({ min: 3, max: 16 })
    .withMessage("Name must be between 3 and 16 characters long"),

  body("email")
    .optional({ checkFalsy: true })
    .isEmail()
    .withMessage("Invalid email format")
    .normalizeEmail(),

  body("bio")
    .optional({ checkFalsy: true })
    .trim()
    .isLength({ min: 3, max: 260 })
    .withMessage("Bio must be between 3 and 260 characters long"),
];

export const validatePartialUpdateUser = validateUpdateUser;
