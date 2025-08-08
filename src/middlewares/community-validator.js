import { body } from "express-validator";

const isNameValid = body("name")
  .notEmpty()
  .withMessage("Name cannot be empty")
  .bail()
  .isLength({ min: 3, max: 50 })
  .withMessage("Name must be between 3 and 50 characters")
  .bail()
  .isString()
  .withMessage("Name must be a string");

const isDescriptionValid = body("description")
  .optional({ checkFalsy: true })
  .custom((value) => {
    if (value && value.trim().length > 0 && value.trim().length < 10) {
      throw new Error('Description must be between 10 and 500 characters');
    }
    if (value && value.trim().length > 500) {
      throw new Error('Description must be between 10 and 500 characters');
    }
    return true;
  })
  .bail();

export const createCommunityValidator = [isNameValid, isDescriptionValid];

export const updateCommunityValidator = [
  body("name")
    .optional()
    .isLength({ min: 3, max: 50 })
    .withMessage("Name must be between 3 and 50 characters")
    .bail()
    .isString()
    .withMessage("Name must be a string"),
  isDescriptionValid,
];

export const partiallyUpdateCommunityValidator = updateCommunityValidator;
