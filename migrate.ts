import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';
import { roles, users } from './src/db/schema';
import 'dotenv/config';

async function migrate() {
  const sql = neon(process.env.DATABASE_URL!);
  const db = drizzle(sql);

  try {
    // Create roles table
    console.log('Creating roles table...');
    await sql`
      CREATE TABLE IF NOT EXISTS roles (
        id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        role VARCHAR(25) NOT NULL
      );
    `;

    // Create users table
    console.log('Creating users table...');
    await sql`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        "passwordHashed" VARCHAR(255) NOT NULL,
        active BOOLEAN NOT NULL,
        "idRol" INTEGER NOT NULL REFERENCES roles(id)
      );
    `;

    // Insert default roles
    console.log('Inserting default roles...');
    await sql`
      INSERT INTO roles (role) 
      VALUES ('admin'), ('user') 
      ON CONFLICT DO NOTHING;
    `;

    console.log('Migration completed successfully!');
  } catch (error) {
    console.error('Migration failed:', error);
  }
}

migrate();