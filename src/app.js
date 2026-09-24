import express from "express"
import { loggerMiddleware } from "./middlewares/logger.middleware.js"
import { verificarToken } from "./middlewares/auth.middleware.js"
import authRoutes from "./routes/auth.routes.js"
import librosRoutes from "./routes/libros.routes.js"

const app = express()

app.use(express.json())
app.use(loggerMiddleware)

app.use("/auth", authRoutes)
app.use("/libros", verificarToken, librosRoutes)

// Middleware de errores detallado para capturar el 500 en Postman
app.use((err, req, res, next) => {
  console.error("--- ERROR EN SERVIDOR ---")
  console.error(err)
  res.status(500).json({ error: err.message, stack: err.stack })
})

export default app