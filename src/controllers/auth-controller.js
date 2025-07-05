import { register } from "../services/auth-service.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { getByEmail } from "../services/user-services.js";

async function registerUser(req, res) {
  const userData = req.body;
  try {
    const existingUser = await getByEmail(userData.email);
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use" });
    }
    const hashedPassword = bcrypt.hashSync(userData.password, 10);
    const newUser = await register({
      name: userData.name,
      email: userData.email,
      password: hashedPassword,
    });
    return res.status(201).json(newUser);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
}

async function login(req, res) {
  const credentials = req.body;
  try {
    const user = await getByEmail(credentials.email);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isPasswordValid = bcrypt.compareSync(
      credentials.password,
      user.password
    );

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const token = jwt.sign(
      { id: user.id, isAdmin: user.isAdmin },
      process.env.SECRET_JWT,
      {
        expiresIn: "1h", // Token válido por 1 hora
      }
    );
    return res
      .status(200)
      .json({ message: "Login completed successfully", token });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
}

export { registerUser, login };
