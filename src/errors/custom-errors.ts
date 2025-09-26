// Clase base para errores personalizados
export abstract class CustomError extends Error {
  abstract statusCode: number;
  abstract serialize(): { message: string; field?: string; details?: string };

  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, CustomError.prototype);
  }
}

// Error de validación (400)
export class ValidationError extends CustomError {
  statusCode = 400;

  constructor(public message: string, public field?: string) {
    super(message);
    Object.setPrototypeOf(this, ValidationError.prototype);
  }

  serialize() {
    return {
      message: this.message,
      field: this.field,
    };
  }
}

// Error de autorización (401)
export class UnauthorizedError extends CustomError {
  statusCode = 401;

  constructor(message: string = "No autorizado") {
    super(message);
    Object.setPrototypeOf(this, UnauthorizedError.prototype);
  }

  serialize() {
    return {
      message: this.message,
    };
  }
}

// Error de permisos (403)
export class ForbiddenError extends CustomError {
  statusCode = 403;

  constructor(message: string = "Acceso prohibido") {
    super(message);
    Object.setPrototypeOf(this, ForbiddenError.prototype);
  }

  serialize() {
    return {
      message: this.message,
    };
  }
}

// Error de recurso no encontrado (404)
export class NotFoundError extends CustomError {
  statusCode = 404;

  constructor(public resource: string = "Recurso", public id?: string | number) {
    super(`${resource} no encontrado${id ? ` con ID: ${id}` : ""}`);
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }

  serialize() {
    return {
      message: this.message,
      details: this.id ? `ID: ${this.id}` : undefined,
    };
  }
}

// Error de conflicto - recurso ya existe (409)
export class ConflictError extends CustomError {
  statusCode = 409;

  constructor(public resource: string, public field?: string, public value?: string) {
    super(
      `${resource} ya existe${field && value ? ` - ${field}: ${value}` : ""}`
    );
    Object.setPrototypeOf(this, ConflictError.prototype);
  }

  serialize() {
    return {
      message: this.message,
      field: this.field,
      details: this.value,
    };
  }
}

// Error de base de datos (500)
export class DatabaseError extends CustomError {
  statusCode = 500;

  constructor(message: string = "Error de base de datos", public originalError?: Error) {
    super(message);
    Object.setPrototypeOf(this, DatabaseError.prototype);
  }

  serialize() {
    return {
      message: this.message,
      details: process.env.NODE_ENV === "development" ? this.originalError?.message : undefined,
    };
  }
}

// Error interno del servidor (500)
export class InternalServerError extends CustomError {
  statusCode = 500;

  constructor(message: string = "Error interno del servidor", public originalError?: Error) {
    super(message);
    Object.setPrototypeOf(this, InternalServerError.prototype);
  }

  serialize() {
    return {
      message: this.message,
      details: process.env.NODE_ENV === "development" ? this.originalError?.message : undefined,
    };
  }
}

// Error de datos inválidos (422)
export class UnprocessableEntityError extends CustomError {
  statusCode = 422;

  constructor(
    message: string = "Datos no procesables",
    public errors: Array<{ field: string; message: string }> = []
  ) {
    super(message);
    Object.setPrototypeOf(this, UnprocessableEntityError.prototype);
  }

  serialize() {
    return {
      message: this.message,
      details: this.errors.length > 0 ? JSON.stringify(this.errors) : undefined,
    };
  }
}

// Error de límite excedido (429)
export class RateLimitError extends CustomError {
  statusCode = 429;

  constructor(message: string = "Límite de solicitudes excedido") {
    super(message);
    Object.setPrototypeOf(this, RateLimitError.prototype);
  }

  serialize() {
    return {
      message: this.message,
    };
  }
}