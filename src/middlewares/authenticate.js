function authenticateUser(req, res, next) {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ error: "Token not found" });
  }

  try {
    const token = authorization.replace("Bearer", "");

    const { userId } = jwt.decode(token, process.env.SECRET_JWT);

    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    next();
  } catch (error) {
    console.error("Error validating authorization:", error);
    return res.status(401).json({ error: "Token invalid" });
  }
}

export default authenticateUser;
