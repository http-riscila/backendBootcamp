import { body } from "express-validator";

export const loginValidator = [
  body("email")
    .notEmpty()
    .withMessage("Email cannot be empty")
    .bail()
    .isEmail()
    .withMessage("Invalid email format"),
  body("password")
    .notEmpty()
    .withMessage("Password cannot be empty")
    .bail()
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
];

export const registerValidator = [
  body("name")
    .notEmpty()
    .withMessage("Name cannot be empty")
    .bail()
    .isLength({ min: 3, max: 50 })
    .withMessage("Name must be between 3 and 50 characters long")
    .bail()
    .isString()
    .withMessage("Name must be a string"),
  body("email")
    .notEmpty()
    .withMessage("Email cannot be empty")
    .bail()
    .isEmail()
    .withMessage("Invalid email format"),
  body("password")
    .notEmpty()
    .withMessage("Password cannot be empty")
    .bail()
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long")
    .bail()
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .withMessage(
      "Password must include at least: 1 lowercase letter, 1 uppercase letter and a number"
    ),
  body("bio")
    .optional()
    .isLength({ min: 2, max: 100 })
    .withMessage("Bio must be between 3 and 50 characters long")
    .trim()
    .bail()
    .isString()
    .withMessage("Bio must be a string"),
  body("acceptedTerms")
    .notEmpty()
    .withMessage("Terms must be accepted for registration")
    .bail()
    .isBoolean()
    .withMessage("Terms acceptance must be a boolean")
    .bail()
    .equals('true')
    .withMessage("Terms must be accepted for registration"),
];
