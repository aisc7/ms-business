import Route from '@ioc:Adonis/Core/Route'
Route.group(() => {
    // Listar todos los elementos
    Route.get("/spents", "SpentsController.find");
    // Listar por id (unico elemento)
    Route.get("/spents/:id", "SpentsController.find");
    // Crear
    Route.post("/spents", "SpentsController.create");
    // Actualizar
    Route.put("/spents/:id", "SpentsController.update");
    // Borrar
    Route.delete("/spents/:id", "SpentsController.delete");
})//.middleware(["security"])