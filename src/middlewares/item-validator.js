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

const isCategoryValid = isNotEmptyString("category", "Category");

const isStatusValid = body("status")
  .notEmpty()
  .withMessage("Status cannot be empty")
  .bail()
  .isIn(["AVAILABLE", "NOT_AVAILABLE"])
  .withMessage("Status must be one of: AVAILABLE or NOT_AVAILABLE");

const isCommunityIdValid = isNotEmptyString("communityId", "Community ID");

export const createItemValidator = [
  isNameValid,
  isDescriptionValid,
  isCategoryValid,
  isStatusValid,
  isCommunityIdValid,
];

export const updateItemValidator = [
  body("name")
    .optional()
    .isLength({ min: 3, max: 50 })
    .withMessage("Name must be between 3 and 50 characters")
    .bail()
    .isString()
    .withMessage("Name must be a string"),
  isDescriptionValid,
  body("category")
    .optional()
    .isString()
    .withMessage("Category must be a string"),
];

export const partiallyUpdateItemValidator = updateItemValidator;
