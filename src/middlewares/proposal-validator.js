import { body } from "express-validator";

const isDesiredItemIdValid = body("desiredItemId")
  .notEmpty()
  .withMessage("Desired Item ID cannot be empty")
  .bail()
  .isString()
  .withMessage("Desired Item ID must be a string");

const isOfferedItemIdValid = body("offeredItemId")
  .notEmpty()
  .withMessage("Offered Item ID cannot be empty")
  .bail()
  .isString()
  .withMessage("Offered Item ID must be a string");

const isProposalDateValid = body("proposalDate")
  .optional()
  .isISO8601()
  .withMessage("Proposal date must be a valid ISO8601 date");

const isStatusValid = body("status")
  .optional()
  .isIn(["PENDING", "ACCEPTED", "REJECTED", "CANCELLED"])
  .withMessage("Status must be one of: PENDING, ACCEPTED, REJECTED, CANCELLED");

const isSenderIdValid = body("senderId")
  .notEmpty()
  .withMessage("Sender ID cannot be empty")
  .bail()
  .isString()
  .withMessage("Sender ID must be a string");

const isRecipientIdValid = body("recipientId")
  .notEmpty()
  .withMessage("Recipient ID cannot be empty")
  .bail()
  .isString()
  .withMessage("Recipient ID must be a string");

const isCommunityIdValid = body("communityId")
  .notEmpty()
  .withMessage("Community ID cannot be empty")
  .bail()
  .isString()
  .withMessage("Community ID must be a string");

export const createProposalValidator = [
  isDesiredItemIdValid,
  isOfferedItemIdValid,
  isProposalDateValid,
  isStatusValid,
  isSenderIdValid,
  isRecipientIdValid,
  isCommunityIdValid,
];

export const updateProposalValidator = [
  body("desiredItemId")
    .optional()
    .isString()
    .withMessage("Desired Item ID must be a string"),
  body("offeredItemId")
    .optional()
    .isString()
    .withMessage("Offered Item ID must be a string"),
  body("proposalDate")
    .optional()
    .isISO8601()
    .withMessage("Proposal date must be a valid ISO8601 date"),
  body("status")
    .optional()
    .isIn(["PENDING", "ACCEPTED", "REJECTED", "CANCELLED"])
    .withMessage("Status must be one of: PENDING, ACCEPTED, REJECTED, CANCELLED"),
  body("senderId")
    .optional()
    .isString()
    .withMessage("Sender ID must be a string"),
  body("recipientId")
    .optional()
    .isString()
    .withMessage("Recipient ID must be a string"),
  body("communityId")
    .optional()
    .isString()
    .withMessage("Community ID must be a string"),
];

export const partiallyUpdateProposalValidator = updateProposalValidator;