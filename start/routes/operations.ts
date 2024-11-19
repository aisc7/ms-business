import Route from '@ioc:Adonis/Core/Route'
Route.group(() => {
    // Listar todos los elementos
    Route.get("/operations", "OperationsController.find");
    // Listar por id (unico elemento)
    Route.get("/operations/:id", "OperationsController.find");
    // Crear
    Route.post("/operations", "OperationsController.create");
    // Actualizar
    Route.put("/operations/:id", "OperationsController.update");
    // Borrar
    Route.delete("/operations/:id", "OperationsController.delete");
})//.middleware(["security"])