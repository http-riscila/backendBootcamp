import { body, param } from "express-validator";

const isNotEmptyString = (field, label) =>
  body(field)
    .notEmpty()
    .withMessage(`${label} cannot be empty`)
    .bail()
    .isString()
    .withMessage(`${label} must be a string`);

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
  .optional()
  .isLength({ min: 10, max: 500 })
  .withMessage("Description must be between 10 and 500 characters")
  .bail()
  .isString()
  .withMessage("Description must be a string");

const isCommunityIdParamValid = param("id")
  .notEmpty()
  .withMessage("Community ID is required")
  .bail()
  .isUUID()
  .withMessage("Community ID must be a valid UUID");

export const createCommunityValidator = [
  isNameValid,
  isDescriptionValid,
];

export const updateCommunityValidator = [
  isCommunityIdParamValid,
  isNameValid,
  isDescriptionValid,
];

export const partiallyUpdateCommunityValidator = [
  isCommunityIdParamValid,
  body("name")
    .optional()
    .isLength({ min: 3, max: 50 })
    .withMessage("Name must be between 3 and 50 characters")
    .bail()
    .isString()
    .withMessage("Name must be a string"),
  isDescriptionValid,
];

export const idParamValidator = [isCommunityIdParamValid];
