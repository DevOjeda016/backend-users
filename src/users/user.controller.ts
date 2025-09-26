import { Request, Response, NextFunction } from 'express';
import { UserService, CreateUserRequest, UpdateUserRequest, LoginRequest } from './user.service';

export class UserController {
  /**
   * Crear un nuevo usuario
   * POST /api/users
   */
  static async createUser(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const userData: CreateUserRequest = req.body;
      const newUser = await UserService.createUser(userData);
      
      // No devolver la contraseña hasheada
      const { passwordHashed, ...userResponse } = newUser;
      
      res.status(201).json({
        success: true,
        message: 'Usuario creado exitosamente',
        data: userResponse
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Obtener todos los usuarios
   * GET /api/users
   */
  static async getAllUsers(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const users = await UserService.getAllUsers();
      
      // No devolver las contraseñas hasheadas
      const usersResponse = users.map(({ passwordHashed, ...user }) => user);
      
      res.status(200).json({
        success: true,
        message: 'Usuarios obtenidos exitosamente',
        data: usersResponse,
        count: usersResponse.length
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Obtener usuario por ID
   * GET /api/users/:id
   */
  static async getUserById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      const user = await UserService.getUserById(id);
      
      if (!user) {
        res.status(404).json({
          success: false,
          message: 'Usuario no encontrado'
        });
        return;
      }
      
      // No devolver la contraseña hasheada
      const { passwordHashed, ...userResponse } = user;
      
      res.status(200).json({
        success: true,
        message: 'Usuario obtenido exitosamente',
        data: userResponse
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Obtener usuario por email (username)
   * GET /api/users/email/:email
   */
  static async getUserByEmail(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const email = req.params.email;
      const user = await UserService.getUserByEmail(email);
      
      if (!user) {
        res.status(404).json({
          success: false,
          message: 'Usuario no encontrado'
        });
        return;
      }
      
      // No devolver la contraseña hasheada
      const { passwordHashed, ...userResponse } = user;
      
      res.status(200).json({
        success: true,
        message: 'Usuario obtenido exitosamente',
        data: userResponse
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Actualizar usuario
   * PUT /api/users/:id
   */
  static async updateUser(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      const userData: UpdateUserRequest = req.body;
      
      const updatedUser = await UserService.updateUser(id, userData);
      
      if (!updatedUser) {
        res.status(404).json({
          success: false,
          message: 'Usuario no encontrado'
        });
        return;
      }
      
      // No devolver la contraseña hasheada
      const { passwordHashed, ...userResponse } = updatedUser;
      
      res.status(200).json({
        success: true,
        message: 'Usuario actualizado exitosamente',
        data: userResponse
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Eliminar usuario
   * DELETE /api/users/:id
   */
  static async deleteUser(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      const deleted = await UserService.deleteUser(id);
      
      if (!deleted) {
        res.status(404).json({
          success: false,
          message: 'Usuario no encontrado'
        });
        return;
      }
      
      res.status(200).json({
        success: true,
        message: 'Usuario eliminado exitosamente'
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Autenticar usuario (login)
   * POST /api/users/login
   */
  static async loginUser(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const loginData: LoginRequest = req.body;
      const user = await UserService.authenticateUser(loginData);
      
      if (!user) {
        res.status(401).json({
          success: false,
          message: 'Credenciales inválidas'
        });
        return;
      }
      
      // No devolver la contraseña hasheada
      const { passwordHashed, ...userResponse } = user;
      
      res.status(200).json({
        success: true,
        message: 'Autenticación exitosa',
        data: userResponse
      });
    } catch (error) {
      next(error);
    }
  }
}
