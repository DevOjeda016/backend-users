import { Router } from 'express';
import { UserController } from './user.controller';

const userRoutes = Router();

// POST /api/users - Crear usuario
userRoutes.post('/', UserController.createUser);

// POST /api/users/login - Autenticar usuario (login)
userRoutes.post('/login', UserController.loginUser);

// GET /api/users - Obtener todos los usuarios
userRoutes.get('/', UserController.getAllUsers);

// GET /api/users/:id - Obtener usuario por ID
userRoutes.get('/:id', UserController.getUserById);

// GET /api/users/email/:email - Obtener usuario por email (username)
userRoutes.get('/email/:email', UserController.getUserByEmail);

// PUT /api/users/:id - Actualizar usuario
userRoutes.put('/:id', UserController.updateUser);

// DELETE /api/users/:id - Eliminar usuario
userRoutes.delete('/:id', UserController.deleteUser);

export default userRoutes;