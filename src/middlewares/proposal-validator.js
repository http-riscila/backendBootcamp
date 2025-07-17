import { body } from "express-validator";

const isNotEmptyString = (field, label) =>
  body(field)
    .notEmpty()
    .withMessage(`${label} cannot be empty`)
    .bail()
    .isString()
    .withMessage(`${label} must be a string`);

const isDesiredItemIdValid = isNotEmptyString(
  "desiredItemId",
  "Desired Item ID"
);

const isOfferedItemIdValid = isNotEmptyString(
  "offeredItemId",
  "Offered Item ID"
);

const isProposalDateValid = body("proposalDate")
  .notEmpty()
  .withMessage("Proposal date cannot be empty");

const isStatusValid = body("status")
  .isIn(["PENDING", "ACCEPTED", "REJECTED"])
  .withMessage("Status must be one of: PENDING, ACCEPTED, REJECTED");

const isSenderIdValid = isNotEmptyString("senderId", "Sender ID");

const isRecipientIdValid = isNotEmptyString("recipientId", "Recipient ID");

const isCommunityIdValid = isNotEmptyString("communityId", "Community ID");

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
    .isIn(["PENDING", "ACCEPTED", "REJECTED"])
    .withMessage("Status must be one of: PENDING, ACCEPTED, REJECTED"),
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
