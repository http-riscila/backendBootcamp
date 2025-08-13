import jwt from 'jsonwebtoken';

export const refreshTokens = [];

export function generateAccessToken(user) {
  const payload = {
    id: user.id,
    name: user.name,
  };

  return jwt.sign(payload, process.env.SECRET_JWT, {
    expiresIn: '1h',
  });
}

export function generateRefreshToken(user) {
  const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: '7d',
  });
  refreshTokens.push(refreshToken);
  return refreshToken;
}
