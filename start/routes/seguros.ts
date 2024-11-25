import Route from '@ioc:Adonis/Core/Route'
Route.group(() => {
    // Listar todos los elementos
    Route.get("/seguros", "SegurosController.find");
    // Listar por id (unico elemento)
    Route.get("/seguros/:id", "SegurosController.find");
    // Crear
    Route.post("/seguros", "SegurosController.create");
    // Actualizar
    Route.put("/seguros/:id", "SegurosController.update");
    // Borrar
    Route.delete("/seguros/:id", "SegurosController.delete");
})//.middleware(["security"])