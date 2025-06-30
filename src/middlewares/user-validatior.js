function validateUserData(req, res, next) {
  const { name, email, password } = req.body;
  const errors = [];

  // Validar nome
  if (!name || name.trim().length < 2) {
    errors.push("Nome deve ter pelo menos 2 caracteres");
  }

  // Validar email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email)) {
    errors.push("Email deve ter um formato válido");
  }

  // Validar senha (apenas se estiver presente)
  if (password !== undefined && password.length < 6) {
    errors.push("Senha deve ter pelo menos 6 caracteres");
  }

  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  next();
}