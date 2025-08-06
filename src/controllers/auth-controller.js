import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { prettifyError } from 'zod';
import { register } from '../services/auth-service.js';
import { getByEmail, getById } from '../services/user-services.js';
import { createUserSchema } from '../utils/authSchemas.js';
import {
  generateAccessToken,
  generateRefreshToken,
  refreshTokens,
} from '../utils/generateTokens.js';

async function registerUser(req, res) {
  const userData = req.body;

  // Valida o usuario com o schema Zod
  // Se houver erro, retorna o erro formatado
  const result = createUserSchema.safeParse({ body: userData });

  if (!result.success) {
    return res.status(400).send({ errors: prettifyError(result.error) });
  }

  try {
    const existingUser = await getByEmail(userData.email);
    if (existingUser) {
      return res.status(400).json({ message: 'Email already in use' });
    }
    const hashedPassword = bcrypt.hashSync(userData.password, 10);
    const newUser = await register({
      name: userData.name,
      email: userData.email,
      password: hashedPassword,
      bio: userData.bio,
    });
    return res.status(201).json(newUser);
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error', error });
  }
}

async function login(req, res) {
  const credentials = req.body;
  try {
    const user = await getByEmail(credentials.email);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isPasswordValid = bcrypt.compareSync(
      credentials.password,
      user.password
    );

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    const payload = {
      id: user.id,
      name: user.name,
    };

    const accessToken = generateAccessToken(payload);
    const refreshToken = generateRefreshToken(payload);

    const cookieOptions = {
      httpOnly: true,
      sameSite: 'lax',
      secure: false,
      path: '/',
    };

    res.cookie('refreshToken', refreshToken, cookieOptions);

    const { password: _, ...userWithoutPassword } = user;

    res.status(200).json({
      message: 'Login completed successfully',
      token: accessToken,
      user: userWithoutPassword,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Internal server error', error: error.message });
  }
}

function refreshJwt(req, res) {
  const refreshToken = req.cookies.refreshToken;

  if (!(refreshToken && refreshTokens.includes(refreshToken))) {
    return res.status(403).json({ message: 'Forbidden' });
  }

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Forbidden' });
    }
    const newAccessToken = generateAccessToken({
      id: user.id,
      name: user.name,
    });
    res.status(200).json({ accessToken: newAccessToken });
  });
}

async function logout(_, res) {
  await res.clearCookie('refreshToken');
  res.status(200).json({ message: 'Logout successful' });
}

async function getCurrentUser(req, res) {
  try {
    const user = await req.user;
    const userData = await getById(user.id);
    const token = req.cookies.accessToken;

    return res.status(200).json({ userData, token });
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'Erro interno do servidor', error: error.message });
  }
}

export { registerUser, login, logout, getCurrentUser, refreshJwt };
