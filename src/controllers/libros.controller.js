export const obtenerTodos = async (req, res) => {
  try {
    const libros = await prisma.libro.findMany()
    res.json(libros)
  } catch (error) {
    console.error("Error al obtener libros:", error)
    res.status(500).json({ error: "Error interno del servidor" })
  }
}

export const crear = async (req, res) => {
  try {
    if (req.usuario.rol !== "admin") {
      return res.status(403).json({ error: "Acceso denegado: Se requiere rol de administrador" })
    }

    const { titulo, autor } = req.body
    if (!titulo || !autor) {
      return res.status(400).json({ error: "Titulo y autor son obligatorios" })
    }

    const libro = await prisma.libro.create({
      data: { titulo, autor }
    })

    res.status(201).json(libro)
  } catch (error) {
    console.error("Error al crear libro:", error)
    res.status(500).json({ error: "Error interno del servidor" })
  }
}

export const eliminar = async (req, res) => {
  const id = parseInt(req.params.id)
  if (isNaN(id)) return res.status(400).json({ error: "ID de libro inválido" })

  try {
    if (req.usuario.rol !== "admin") {
      return res.status(403).json({ error: "Acceso denegado: Se requiere rol de administrador" })
    }

    const existe = await prisma.libro.findUnique({ where: { id } })
    if (!existe) {
      return res.status(404).json({ error: "Libro no encontrado" })
    }

    await prisma.libro.delete({ where: { id } })
    res.json({ mensaje: "Libro eliminado correctamente" })
  } catch (error) {
    console.error("Error al eliminar libro:", error)
    res.status(500).json({ error: "Error interno del servidor" })
  }
}