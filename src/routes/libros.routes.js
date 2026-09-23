import { obtenerTodos, crear, eliminar } from "../controllers/libros.controller.js"

const router = Router()

router.get("/", obtenerTodos)
router.post("/", crear)
router.delete("/:id", eliminar)
export default router