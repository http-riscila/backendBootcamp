import jwt from 'jsonwebtoken';

function authenticateUser(req, res, next) {
  /* const { authorization } = req.headers;

  if (!(authorization && authorization.startsWith('Bearer '))) {
    return res.status(401).json({ error: 'Token not found or malformed' });
  }  

  const token = authorization.split(' ')[1]; 

  try {
    const decoded = jwt.verify(token, process.env.SECRET_JWT);

    if (!decoded.id) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    req.user = {
      id: decoded.id,
      isAdmin: decoded.isAdmin,
    };

    next();
  } catch (error) {
    console.error('Error validating authorization:', error);
    return res.status(401).json({ error: 'Token invalid' });
  }*/

  // Implementação de autenticação usando cookies
  const token = req.cookies.accessToken;

  if (!token) {
    return res.status(401).json({
      success: false,
      message:
        'Token de autenticação não encontrado. Faça login para acessar este recurso.',
      errorCode: 'AUTH_TOKEN_MISSING',
    });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, userPayload) => {
    if (err) {
      return res.status(403).json({
        success: false,
        message: 'Token inválido ou expirado. Por favor, faça login novamente.',
        errorCode: 'AUTH_TOKEN_INVALID',
      });
    }

    req.user = userPayload;
    next();
  });
}

export default authenticateUser;
