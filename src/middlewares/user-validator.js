import { body, param, query, validationResult } from 'express-validator';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Middleware para capturar erros de validação
export const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Dados inválidos',
      errors: errors.array()
    });
  }
  next();
};

// Validadores para criação de usuário
export const validateCreateUser = [
  body('name')
    .notEmpty()
    .withMessage('Nome é obrigatório')
    .isLength({ min: 2, max: 100 })
    .withMessage('Nome deve ter entre 2 e 100 caracteres')
    .trim(),
  
  body('email')
    .isEmail()
    .withMessage('Email deve ser válido')
    .normalizeEmail()
    .custom(async (email) => {
      const existingUser = await prisma.user.findUnique({
        where: { email }
      });
      if (existingUser) {
        throw new Error('Email já está em uso');
      }
      return true;
    }),
  
  body('password')
    .isLength({ min: 6 })
    .withMessage('Senha deve ter pelo menos 6 caracteres')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .withMessage('Senha deve conter pelo menos: 1 letra minúscula, 1 maiúscula e 1 número'),
  
  handleValidationErrors
];

// Validadores para atualização de usuário
export const validateUpdateUser = [
  param('id')
    .isUUID()
    .withMessage('ID do usuário deve ser um UUID válido'),
  
  body('name')
    .optional()
    .isLength({ min: 2, max: 100 })
    .withMessage('Nome deve ter entre 2 e 100 caracteres')
    .trim(),
  
  body('email')
    .optional()
    .isEmail()
    .withMessage('Email deve ser válido')
    .normalizeEmail()
    .custom(async (email, { req }) => {
      if (email) {
        const existingUser = await prisma.user.findUnique({
          where: { email }
        });
        // Verifica se o email já existe para outro usuário
        if (existingUser && existingUser.id !== req.params.id) {
          throw new Error('Email já está em uso');
        }
      }
      return true;
    }),
  
  body('password')
    .optional()
    .isLength({ min: 6 })
    .withMessage('Senha deve ter pelo menos 6 caracteres')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .withMessage('Senha deve conter pelo menos: 1 letra minúscula, 1 maiúscula e 1 número'),
  
  handleValidationErrors
];

// Validador para buscar usuário por ID
export const validateGetUser = [
  param('id')
    .isUUID()
    .withMessage('ID do usuário deve ser um UUID válido')
    .custom(async (id) => {
      const user = await prisma.user.findUnique({
        where: { id }
      });
      if (!user) {
        throw new Error('Usuário não encontrado');
      }
      return true;
    }),
  
  handleValidationErrors
];

// Validador para deletar usuário
export const validateDeleteUser = [
  param('id')
    .isUUID()
    .withMessage('ID do usuário deve ser um UUID válido')
    .custom(async (id) => {
      const user = await prisma.user.findUnique({
        where: { id },
        include: {
          creator: true,
          communityMember: true,
          sentProposal: true,
          receivedProposal: true
        }
      });
      
      if (!user) {
        throw new Error('Usuário não encontrado');
      }
      
      // Verificar se usuário tem relacionamentos ativos
      if (user.creator.length > 0) {
        throw new Error('Não é possível excluir usuário que possui itens cadastrados');
      }
      
      if (user.sentProposal.length > 0 || user.receivedProposal.length > 0) {
        throw new Error('Não é possível excluir usuário que possui propostas ativas');
      }
      
      return true;
    }),
  
  handleValidationErrors
];

// Validador para login
export const validateLogin = [
  body('email')
    .isEmail()
    .withMessage('Email deve ser válido')
    .normalizeEmail(),
  
  body('password')
    .notEmpty()
    .withMessage('Senha é obrigatória'),
  
  handleValidationErrors
];

// Validador para listagem de usuários (com paginação)
export const validateListUsers = [
  query('page')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Página deve ser um número inteiro maior que 0'),
  
  query('limit')
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage('Limite deve ser um número entre 1 e 100'),
  
  query('search')
    .optional()
    .isLength({ min: 1, max: 100 })
    .withMessage('Busca deve ter entre 1 e 100 caracteres')
    .trim(),
  
  handleValidationErrors
];

// Validador para buscar usuários de uma comunidade
export const validateGetCommunityUsers = [
  param('communityId')
    .isUUID()
    .withMessage('ID da comunidade deve ser um UUID válido')
    .custom(async (communityId) => {
      const community = await prisma.community.findUnique({
        where: { id: communityId }
      });
      if (!community) {
        throw new Error('Comunidade não encontrada');
      }
      return true;
    }),
  
  query('isAdmin')
    .optional()
    .isBoolean()
    .withMessage('isAdmin deve ser true ou false'),
  
  handleValidationErrors
];

// Validador para alterar senha
export const validateChangePassword = [
  param('id')
    .isUUID()
    .withMessage('ID do usuário deve ser um UUID válido'),
  
  body('currentPassword')
    .notEmpty()
    .withMessage('Senha atual é obrigatória'),
  
  body('newPassword')
    .isLength({ min: 6 })
    .withMessage('Nova senha deve ter pelo menos 6 caracteres')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .withMessage('Nova senha deve conter pelo menos: 1 letra minúscula, 1 maiúscula e 1 número'),
  
  body('confirmPassword')
    .custom((value, { req }) => {
      if (value !== req.body.newPassword) {
        throw new Error('Confirmação de senha não confere');
      }
      return true;
    }),
  
  handleValidationErrors
];

// Middleware para verificar se usuário existe (reutilizável)
export const checkUserExists = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    if (!id) {
      return res.status(400).json({
        success: false,
        message: 'ID do usuário é obrigatório'
      });
    }
    
    const user = await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
        updatedAt: true
      }
    });
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Usuário não encontrado'
      });
    }
    
    req.user = user;
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Erro ao verificar usuário',
      error: error.message
    });
  }
};

// Sanitizar dados do usuário (remover senha do retorno)
export const sanitizeUserData = (user) => {
  const { password, ...sanitizedUser } = user;
  return sanitizedUser;
};

// Middleware para sanitizar response
export const sanitizeResponse = (req, res, next) => {
  const originalSend = res.send;
  
  res.send = function(data) {
    if (typeof data === 'string') {
      try {
        data = JSON.parse(data);
      } catch (e) {
        return originalSend.call(this, data);
      }
    }
    
    if (data && data.user) {
      data.user = sanitizeUserData(data.user);
    }
    
    if (data && data.users && Array.isArray(data.users)) {
      data.users = data.users.map(user => sanitizeUserData(user));
    }
    
    return originalSend.call(this, JSON.stringify(data));
  };
  
  next();
};