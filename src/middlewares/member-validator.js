import { body } from "express-validator";

const isUserIdValid = body("userId")
  .notEmpty()
  .withMessage("User ID cannot be empty")
  .bail()
  .isInt({ min: 1 })
  .withMessage("User ID must be a positive integer");

const isCommunityIdValid = body("communityId")
  .notEmpty()
  .withMessage("Community ID cannot be empty")
  .bail()
  .isInt({ min: 1 })
  .withMessage("Community ID must be a positive integer");

const isAdminValid = body("isAdmin")
  .isBoolean()
  .withMessage("isAdmin must be a boolean value");

export const createMemberValidator = [
  isUserIdValid,
  isCommunityIdValid,
  isAdminValid,
];

export const updateMemberValidator = [
  body("userId")
    .optional()
    .isInt({ min: 1 })
    .withMessage("User ID must be a positive integer"),
  body("communityId")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Community ID must be a positive integer"),
  body("isAdmin")
    .optional()
    .isBoolean()
    .withMessage("isAdmin must be a boolean value"),
];
