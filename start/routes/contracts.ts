import Route from '@ioc:Adonis/Core/Route'
Route.group(() => {
    // Listar todos los elementos
    Route.get("/contracts", "ContractsController.find");
    // Listar por id (unico elemento)
    Route.get("/contracts/:id", "ContractsController.find");
    // Crear
    Route.post("/contracts", "ContractsController.create");
    // Actualizar
    Route.put("/contracts/:id", "ContractsController.update");
    // Borrar
    Route.delete("/contracts/:id", "ContractsController.delete");
})//.middleware(["security"])