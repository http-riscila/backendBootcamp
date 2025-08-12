import express from 'express';
import {
  deleteUser,
  getAllUsers,
  getUserByEmail,
  getUserById,
  partiallyUpdateUser,
  removeUserProfileImage,
  updateUser,
  updateUserProfileImage,
} from '../controllers/user-controller.js';
import authenticateUser from '../middlewares/authenticate.js';
import profileImageUploadMiddleware from '../middlewares/profileImageUploadMiddleware.js';
import {
  validatePartialUpdateUser,
  validateUpdateUser,
} from '../middlewares/user-validator.js';
import handleValidationErrors from '../middlewares/validation.js';

const usersRouter = express.Router();

usersRouter.get('/users', getAllUsers);
usersRouter.get('/users/:id', authenticateUser, getUserById);
usersRouter.get('/users', getUserByEmail);
usersRouter.put(
  '/users/:id',
  authenticateUser,
  validateUpdateUser,
  handleValidationErrors,
  updateUser
);
usersRouter.patch(
  '/users/:id',
  authenticateUser,
  validatePartialUpdateUser,
  handleValidationErrors,
  partiallyUpdateUser
);
usersRouter.delete('/users/:id', authenticateUser, deleteUser);

// Rotas para upload de foto de perfil
usersRouter.post(
  '/users/:id/profile-image',
  authenticateUser,
  profileImageUploadMiddleware,
  updateUserProfileImage
);
usersRouter.delete(
  '/users/:id/profile-image',
  authenticateUser,
  removeUserProfileImage
);

export default usersRouter;
