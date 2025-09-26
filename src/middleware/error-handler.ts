/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response, NextFunction } from "express";
import { CustomError } from "../errors/custom-errors";

// Interface para errores de base de datos conocidos
interface DatabaseErrorCodes {
  [key: string]: {
    statusCode: number;
    message: string;
  };
}

// Códigos de error conocidos de PostgreSQL/Neon
const DATABASE_ERROR_CODES: DatabaseErrorCodes = {
  "23505": {
    statusCode: 409,
    message: "Ya existe un registro con esos datos únicos",
  },
  "23503": {
    statusCode: 400,
    message: "Referencia a un registro que no existe",
  },
  "23502": {
    statusCode: 400,
    message: "Campo obligatorio faltante",
  },
  "22001": {
    statusCode: 400,
    message: "Datos demasiado largos para el campo",
  },
  "08006": {
    statusCode: 500,
    message: "Error de conexión con la base de datos",
  },
};

// Función para extraer información útil del error de base de datos
const parseDatabaseError = (error: any) => {
  const code = error.code;
  const constraint = error.constraint;
  const detail = error.detail;
  
  if (DATABASE_ERROR_CODES[code]) {
    return {
      statusCode: DATABASE_ERROR_CODES[code].statusCode,
      message: DATABASE_ERROR_CODES[code].message,
      details: detail || constraint,
    };
  }
  
  return {
    statusCode: 500,
    message: "Error de base de datos",
    details: process.env.NODE_ENV === "development" ? error.message : undefined,
  };
};

// Función para registrar errores
const logError = (error: Error, req: Request) => {
  const timestamp = new Date().toISOString();
  const method = req.method;
  const url = req.originalUrl;
  const userAgent = req.get("User-Agent") || "Unknown";
  
  console.error(`
🚨 ERROR ${timestamp}
Method: ${method}
URL: ${url}
User-Agent: ${userAgent}
Error: ${error.name}: ${error.message}
Stack: ${error.stack}
--------------------------------------------------
  `);
};

// Middleware principal de manejo de errores
export const errorHandler = (
  error: Error,
  req: Request,
  res: Response,
): void => {
  // Registrar el error
  logError(error, req);

  // Si es un error personalizado, manejarlo directamente
  if (error instanceof CustomError) {
    res.status(error.statusCode).json({
      success: false,
      error: error.serialize(),
      timestamp: new Date().toISOString(),
      path: req.originalUrl,
    });
    return;
  }

  // Manejo específico para errores de base de datos
  if (error.name === "DatabaseError" || (error as any).code) {
    const dbError = parseDatabaseError(error);
    res.status(dbError.statusCode).json({
      success: false,
      error: {
        message: dbError.message,
        details: dbError.details,
      },
      timestamp: new Date().toISOString(),
      path: req.originalUrl,
    });
    return;
  }

  // Manejo para errores de validación de JSON
  if (error.name === "SyntaxError" && "body" in error) {
    res.status(400).json({
      success: false,
      error: {
        message: "JSON inválido en el cuerpo de la petición",
      },
      timestamp: new Date().toISOString(),
      path: req.originalUrl,
    });
    return;
  }

  // Manejo para errores de Drizzle ORM específicos
  if (error.message.includes("violates")) {
    res.status(409).json({
      success: false,
      error: {
        message: "Violación de restricción de base de datos",
        details: process.env.NODE_ENV === "development" ? error.message : undefined,
      },
      timestamp: new Date().toISOString(),
      path: req.originalUrl,
    });
    return;
  }

  // Error genérico del servidor
  res.status(500).json({
    success: false,
    error: {
      message: "Error interno del servidor",
      details: process.env.NODE_ENV === "development" ? error.message : "Algo salió mal",
    },
    timestamp: new Date().toISOString(),
    path: req.originalUrl,
  });
};

// Middleware para manejar rutas no encontradas (404)
export const notFoundHandler = (req: Request, res: Response): void => {
  res.status(404).json({
    success: false,
    error: {
      message: "Ruta no encontrada",
      details: `El endpoint ${req.method} ${req.originalUrl} no existe`,
    },
    timestamp: new Date().toISOString(),
    path: req.originalUrl,
    availableEndpoints: {
      users: "/api/users",
      health: "/health",
      docs: "/api/docs (próximamente)",
    },
  });
};

// Wrapper para capturar errores asíncronos
export const asyncHandler = (
  fn: (req: Request, res: Response, next: NextFunction) => Promise<any>
) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};