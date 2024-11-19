import Route from '@ioc:Adonis/Core/Route'
Route.group(() => {
    // Listar todos los elementos
    Route.get("/hotels", "HotelsController.find");
    // Listar por id (unico elemento)
    Route.get("/hotels/:id", "HotelsController.find");
    // Crear
    Route.post("/hotels", "HotelsController.create");
    // Actualizar
    Route.put("/hotels/:id", "HotelsController.update");
    // Borrar
    Route.delete("/hotels/:id", "HotelsController.delete");
})//.middleware(["security"])