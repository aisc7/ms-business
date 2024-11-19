import Route from '@ioc:Adonis/Core/Route'
Route.group(() => {
    // Listar todos los elementos
    Route.get("/conductors", "ConductorsController.find");
    // Listar por id (unico elemento)
    Route.get("/conductors/:id", "ConductorsController.find");
    // Crear
    Route.post("/conductors", "ConductorsController.create");
    // Actualizar
    Route.put("/conductors/:id", "ConductorsController.update");
    // Borrar
    Route.delete("/conductors/:id", "ConductorsController.delete");
})//.middleware(["security"])