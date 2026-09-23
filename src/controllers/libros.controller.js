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
    const { titulo, autor, disponible } = req.body
    const libro = await prisma.libro.create({
      data: { titulo, autor, disponible }
    })
    res.status(201).json(libro)
  } catch (error) {
    console.error("Error al crear libro:", error)
    res.status(500).json({ error: "Error interno del servidor" })
  }
}

export const eliminar = async (req, res) => {
  const id = parseInt(req.params.id)
  if (isNaN(id)) return res.status(400).json({ error: "ID de libro invalido" }) 
  
  }
  