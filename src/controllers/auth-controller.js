import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { prettifyError } from 'zod';
import { register } from '../services/auth-service.js';
import { getByEmail } from '../services/user-services.js';
import { createUserSchema } from '../utils/authSchemas.js';

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
      isAdmin: user.isAdmin,
    };

    const token = jwt.sign(payload, process.env.SECRET_JWT, {
      expiresIn: '1h',
    });

    const cookieOptions = {
      httpOnly: false,
      sameSite: 'lax',
      secure: false,
      maxAge: 3_600_000,
      path: '/',
    };

    res.cookie('accessToken', token, cookieOptions);

    const { password: _, ...userWithoutPassword } = user;

    return res.status(200).json({
      message: 'Login completed successfully',
      token,
      user: userWithoutPassword,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Internal server error', error: error.message });
  }
}

async function logout(_, res) {
  const cookieOptions = {
    httpOnly: false,
    sameSite: 'lax',
    secure: false,
    path: '/',
  };
  await res.clearCookie('accessToken', cookieOptions);
  res.status(200).json({ message: 'Logout successful' });
}

export { registerUser, login, logout };
