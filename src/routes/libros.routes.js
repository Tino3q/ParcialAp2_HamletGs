import { Router } from "express"
import { obtenerTodos, crear, eliminar } from "../controllers/libros.controller.js"
import { soloAdmin } from "../middlewares/auth.middleware.js" 
const router = Router()

router.get("/", obtenerTodos)               
router.post("/", soloAdmin, crear)          
router.delete("/:id", soloAdmin, eliminar)  

export default router