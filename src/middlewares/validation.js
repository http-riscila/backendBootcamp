import { validationResult } from "express-validator";

function handleValidationErrors(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const messages = errors.array().map((err) => err.msg);
    return res.status(400).json({ errors: messages });
  }
  next();
}

export default handleValidationErrors;
