export const pedirPrestado = async (req, res) => {
  try {
    const { libroId } = req.body
    const libroIdParsed = parseInt(libroId)

    if (isNaN(libroIdParsed)) {
      return res.status(400).json({ error: "ID de libro invalido" })
    }

    const libro = await prisma.libro.findUnique({ where: { id: libroIdParsed } })
    if (!libro) {
      return res.status(404).json({ error: "El libro solicitado no existe" })
    }

    if (!libro.disponible) {
      return res.status(400).json({ error: "El libro no se encuentra disponible actualmente" })
    }

    res.status(201).json(prestamo)
  } catch (error) {
    console.error("Error al solicitar prestamo:", error)
    res.status(500).json({ error: "Error interno del servidor" })
  }
}

export const misPrestamos = async (req, res) => {
  try {
    const prestamos = await prisma.prestamo.findMany({
      where: { usuarioId: req.usuario.id },
      include: { libro: true }
    })
    res.json(prestamos)
  } catch (error) {
    console.error("Error al obtener mis préstamos:", error)
    res.status(500).json({ error: "Error interno del servidor" })
  }
}
