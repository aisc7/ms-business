import Route from '@ioc:Adonis/Core/Route'
Route.group(() => {
    // Listar todos los elementos
    Route.get("/routes", "RoutesController.find");
    // Listar por id (unico elemento)
    Route.get("/routes/:id", "RoutesController.find");
    // Crear
    Route.post("/routes", "RoutesController.create");
    // Actualizar
    Route.put("/routes/:id", "RoutesController.update");
    // Borrar
    Route.delete("/routes/:id", "RoutesController.delete");
})//.middleware(["security"])