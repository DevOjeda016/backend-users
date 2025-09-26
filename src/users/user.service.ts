import bcrypt from 'bcrypt';
import { UserRepository } from './user.repository';
import type { User, NewUser } from './user.model';

export interface CreateUserRequest {
  name: string;
  email: string;
  password: string;
  active?: boolean;
  idRol: number;
}

export interface UpdateUserRequest {
  name?: string;
  email?: string;
  password?: string;
  active?: boolean;
  idRol?: number;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export class UserService {
  private static readonly SALT_ROUNDS = 10;

  /**
   * Crear un nuevo usuario
   */
  static async createUser(userData: CreateUserRequest): Promise<User> {
    // Validar que el email no existe
    const existingUser = await UserRepository.existsByEmail(userData.email);
    if (existingUser) {
      throw new Error('El email ya está registrado');
    }

    // Validar datos requeridos
    if (!userData.name || !userData.email || !userData.password) {
      throw new Error('Nombre, email y contraseña son requeridos');
    }

    // Validar formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(userData.email)) {
      throw new Error('Formato de email inválido');
    }

    // Validar contraseña (mínimo 6 caracteres)
    if (userData.password.length < 6) {
      throw new Error('La contraseña debe tener al menos 6 caracteres');
    }

    // Encriptar contraseña
    const passwordHashed = await bcrypt.hash(userData.password, this.SALT_ROUNDS);

    // Crear usuario
    const newUser: NewUser = {
      name: userData.name.trim(),
      email: userData.email.toLowerCase().trim(),
      passwordHashed,
      active: userData.active ?? true,
      idRol: userData.idRol
    };

    return await UserRepository.create(newUser);
  }

  /**
   * Obtener todos los usuarios
   */
  static async getAllUsers(): Promise<User[]> {
    return await UserRepository.findAll();
  }

  /**
   * Obtener usuario por ID
   */
  static async getUserById(id: number): Promise<User | null> {
    if (!id || id <= 0) {
      throw new Error('ID de usuario inválido');
    }
    return await UserRepository.findById(id);
  }

  /**
   * Obtener usuario por email (username)
   */
  static async getUserByEmail(email: string): Promise<User | null> {
    if (!email || !email.trim()) {
      throw new Error('Email requerido');
    }
    return await UserRepository.findByEmail(email.toLowerCase().trim());
  }

  /**
   * Actualizar usuario
   */
  static async updateUser(id: number, userData: UpdateUserRequest): Promise<User | null> {
    if (!id || id <= 0) {
      throw new Error('ID de usuario inválido');
    }

    // Verificar que el usuario existe
    const existingUser = await UserRepository.findById(id);
    if (!existingUser) {
      throw new Error('Usuario no encontrado');
    }

    // Si se actualiza el email, verificar que no exista otro usuario con ese email
    if (userData.email && userData.email !== existingUser.email) {
      const emailExists = await UserRepository.existsByEmail(userData.email);
      if (emailExists) {
        throw new Error('El email ya está en uso por otro usuario');
      }
    }

    // Preparar datos para actualizar
    const updateData: Partial<NewUser> = {};

    if (userData.name !== undefined) {
      if (!userData.name.trim()) {
        throw new Error('El nombre no puede estar vacío');
      }
      updateData.name = userData.name.trim();
    }

    if (userData.email !== undefined) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(userData.email)) {
        throw new Error('Formato de email inválido');
      }
      updateData.email = userData.email.toLowerCase().trim();
    }

    if (userData.password !== undefined) {
      if (userData.password.length < 6) {
        throw new Error('La contraseña debe tener al menos 6 caracteres');
      }
      updateData.passwordHashed = await bcrypt.hash(userData.password, this.SALT_ROUNDS);
    }

    if (userData.active !== undefined) {
      updateData.active = userData.active;
    }

    if (userData.idRol !== undefined) {
      updateData.idRol = userData.idRol;
    }

    return await UserRepository.update(id, updateData);
  }

  /**
   * Eliminar usuario
   */
  static async deleteUser(id: number): Promise<boolean> {
    if (!id || id <= 0) {
      throw new Error('ID de usuario inválido');
    }

    // Verificar que el usuario existe
    const existingUser = await UserRepository.findById(id);
    if (!existingUser) {
      throw new Error('Usuario no encontrado');
    }

    return await UserRepository.delete(id);
  }

  /**
   * Autenticación de usuario (login)
   */
  static async authenticateUser(loginData: LoginRequest): Promise<User | null> {
    if (!loginData.email || !loginData.password) {
      throw new Error('Email y contraseña son requeridos');
    }

    // Buscar usuario por email
    const user = await UserRepository.findByEmail(loginData.email.toLowerCase().trim());
    if (!user) {
      throw new Error('Credenciales inválidas');
    }

    // Verificar que el usuario esté activo
    if (!user.active) {
      throw new Error('Usuario inactivo');
    }

    // Verificar contraseña
    const isValidPassword = await bcrypt.compare(loginData.password, user.passwordHashed);
    if (!isValidPassword) {
      throw new Error('Credenciales inválidas');
    }

    return user;
  }
}
