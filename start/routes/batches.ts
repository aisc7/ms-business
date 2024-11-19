import Route from '@ioc:Adonis/Core/Route'
Route.group(() => {
    // Listar todos los elementos
    Route.get("/batches", "BatchesController.find");
    // Listar por id (unico elemento)
    Route.get("/batches/:id", "BatchesController.find");
    // Crear
    Route.post("/batches", "BatchesController.create");
    // Actualizar
    Route.put("/batches/:id", "BatchesController.update");
    // Borrar
    Route.delete("/batches/:id", "BatchesController.delete");
})//.middleware(["security"])