import { body } from "express-validator";

// Validador para atualização de usuário
export const validateUpdateUser = [
  body("name")
    .optional()
    .isLength({ min: 2, max: 100 })
    .withMessage("Name must be between 3 and 50 characters long")
    .trim(),

  body("email")
    .optional()
    .isEmail()
    .withMessage("Invalid email format")
    .normalizeEmail(),

  body("password")
    .optional()
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long")
    .bail()
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .withMessage(
      "Password must include at least: 1 lowercase letter, 1 uppercase letter and a number"
    ),
];

export const validatePartialUpdateUser = validateUpdateUser;
