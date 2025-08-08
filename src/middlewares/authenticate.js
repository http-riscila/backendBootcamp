import jwt from "jsonwebtoken";

function authenticateUser(req, res, next) {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Token not found or malformed" });
  }

  const token = authorization.split(" ")[1];

  try {
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
    console.error("Error validating authorization:", error.message);
    return res.status(401).json({ error: "Token invalid" });
  }
}

export default authenticateUser;
