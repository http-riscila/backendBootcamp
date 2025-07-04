import { body } from "express-validator";

const isUserIdValid = body("id_usuario")
  .notEmpty()
  .withMessage("User ID cannot be empty")
  .bail()
  .isInt({ min: 1 })
  .withMessage("User ID must be a positive integer");

const isCommunityIdValid = body("id_comunidade")
  .notEmpty()
  .withMessage("Community ID cannot be empty")
  .bail()
  .isInt({ min: 1 })
  .withMessage("Community ID must be a positive integer");

export const createMemberValidator = [
  isUserIdValid,
  isCommunityIdValid
];

export const updateMemberValidator = [
  body("id_usuario")
    .optional()
    .isInt({ min: 1 })
    .withMessage("User ID must be a positive integer"),
  body("id_comunidade")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Community ID must be a positive integer")
];
