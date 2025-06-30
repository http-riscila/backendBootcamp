import { body } from "express-validator";

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
  .withMessage("Description must be between 10 and 500 characters");

const isCommunityIdValid = body("communityId")
  .notEmpty()
  .withMessage("Community ID cannot be empty");

const isCreatedByValid = body("createdBy")
  .notEmpty()
  .withMessage("Created By cannot be empty")
  .bail()
  .isString()
  .withMessage("Created By must be a string");

export const createItemValidator = [
  isNameValid,
  isDescriptionValid,
  isNotEmptyString("status", "Status"),
  isCommunityIdValid,
  isCreatedByValid,
];

export const updateItemValidator = [
  body("name")
    .optional()
    .isLength({ min: 3, max: 50 })
    .withMessage("Name must be between 3 and 50 characters")
    .bail()
    .isString()
    .withMessage("Name must be a string"),
  body("description")
    .optional()
    .isLength({ min: 10, max: 500 })
    .withMessage("Description must be between 10 and 500 characters"),
];

export const partiallyUpdateItemValidator = updateItemValidator;
