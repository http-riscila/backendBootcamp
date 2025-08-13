import { body } from 'express-validator';

const isUserIdValid = body('userId')
  .notEmpty()
  .withMessage('User ID cannot be empty')
  .bail()
  .isString()
  .withMessage('User ID must be a string');

const isCommunityIdValid = body('communityId')
  .notEmpty()
  .withMessage('Community ID cannot be empty')
  .bail()
  .isString()
  .withMessage('Community ID must be a string');

const isAdminValid = body('isAdmin')
  .isBoolean()
  .withMessage('isAdmin must be a boolean value');

export const createMemberValidator = [
  isUserIdValid,
  isCommunityIdValid,
  isAdminValid,
];

export const updateMemberValidator = [
  body('userId').optional().isString().withMessage('User ID must be a string'),
  body('communityId')
    .optional()
    .isString()
    .withMessage('Community ID must be a string'),
  body('isAdmin')
    .optional()
    .isBoolean()
    .withMessage('isAdmin must be a boolean value'),
];
