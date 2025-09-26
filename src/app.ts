import express, { Request, Response, NextFunction } from "express";
import "dotenv/config";
/* import userRoutes from "./routes/user.routes"; */
import { errorHandler, notFoundHandler } from "./middleware/error-handler";

const app = express();

// Middleware para parsing de JSON
app.use(express.json());

// Middleware de logging
app.use((req: Request, _, next: NextFunction) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Middleware de CORS
app.use((req: Request, res: Response, next: NextFunction) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,PATCH,OPTIONS");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  
  if (req.method === "OPTIONS") {
    res.sendStatus(200);
  } else {
    next();
  }
});

// Ruta raíz
app.get("/", (_, res: Response) => {
  res.json({
    success: true,
    message: "Backend Users API - CRUD de Usuarios",
    version: "1.0.0",
    endpoints: {
      auth: "/api/auth",
      users: "/api/users",
      health: "/health"
    }
  });
});

// Ruta de health check
app.get("/health", (_, res: Response) => {
  res.json({
    success: true,
    message: "API funcionando correctamente",
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// Rutas de API
/* app.use("/api/users", userRoutes); */

// Middleware para rutas no encontradas
app.use("*", notFoundHandler);

// Middleware de manejo de errores (debe ir al final)
app.use(errorHandler);

export default app;
