import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';
import { users } from '../db/schema';
import { eq } from 'drizzle-orm';
import type { User, NewUser } from './user.model';

// Configuración de la base de datos
const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql);

export class UserRepository {
  /**
   * Crear un nuevo usuario
   */
  static async create(userData: NewUser): Promise<User> {
    const result = await db.insert(users).values(userData).returning();
    return result[0];
  }

  /**
   * Obtener todos los usuarios
   */
  static async findAll(): Promise<User[]> {
    return await db.select().from(users);
  }

  /**
   * Obtener usuario por ID
   */
  static async findById(id: number): Promise<User | null> {
    const result = await db.select().from(users).where(eq(users.id, id));
    return result[0] || null;
  }

  /**
   * Obtener usuario por email (username)
   */
  static async findByEmail(email: string): Promise<User | null> {
    const result = await db.select().from(users).where(eq(users.email, email));
    return result[0] || null;
  }

  /**
   * Actualizar usuario
   */
  static async update(id: number, userData: Partial<NewUser>): Promise<User | null> {
    const result = await db
      .update(users)
      .set(userData)
      .where(eq(users.id, id))
      .returning();
    return result[0] || null;
  }

  /**
   * Eliminar usuario
   */
  static async delete(id: number): Promise<boolean> {
    const result = await db.delete(users).where(eq(users.id, id)).returning();
    return result.length > 0;
  }

  /**
   * Verificar si existe un usuario con el email dado
   */
  static async existsByEmail(email: string): Promise<boolean> {
    const result = await db.select({ id: users.id }).from(users).where(eq(users.email, email));
    return result.length > 0;
  }
}
