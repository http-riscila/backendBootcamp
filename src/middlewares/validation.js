import { validationResult } from "express-validator";

function handleValidationErrors(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const messages = errors.array().map((err) => err.msg);
    console.log("Validation errors:", errors.array());
    console.log("Request body:", req.body);
    return res.status(400).json({ 
      message: "Validation failed",
      errors: messages,
      details: errors.array()
    });
  }
  next();
}

export default handleValidationErrors;
