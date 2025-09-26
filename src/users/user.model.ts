import { type InferSelectModel, type InferInsertModel } from 'drizzle-orm';
import {users, roles} from '../db/schema';

/**
 * Representa un usuario como se obtiene de la base de datos (SELECT)
 * Inlcuye todos los campos , como 'id'.
 */
export type User = InferSelectModel<typeof users>;

/**
 * Representa los datos necesarios para crear un nuevo usuario (INSERT)
 * Drizzle omite automaticamente los campos que la base de datos genera, como 'id'.
 */
export type NewUser = InferInsertModel<typeof users>;

/**
 * Representa un rol como se obtiene de la base de datos (SELECT).
 */
export type Role = InferSelectModel<typeof roles>;

/**
 * Representa los datos necesarios para crear un nuevo rol (INSERT).
 */
export type NewRole = InferInsertModel<typeof roles>;