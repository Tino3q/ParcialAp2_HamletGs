import { pedirPrestado, devolver, obtenerTodos, misPrestamos } from "../controllers/prestamos.controller.js"

const router = Router()

router.post("/", pedirPrestado)
router.get("/mis-prestamos", misPrestamos)

export default router
