import jwt from "jsonwebtoken";

function authenticateUser(req, res, next) {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ error: "Token not found" });
  }

  try {
    const token = authorization.replace("Bearer", "").trim();

    const decoded = jwt.verify(token, process.env.SECRET_JWT);

    if (!decoded.id) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    req.user = {
      id: decoded.id,
      isAdmin: decoded.isAdmin,
    };
    next();
  } catch (error) {
    console.error("Error validating authorization:", error);
    return res.status(401).json({ error: "Token invalid" });
  }
}

export default authenticateUser;
