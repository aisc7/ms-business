import Route from '@ioc:Adonis/Core/Route'
Route.group(() => {
    // Listar todos los elementos
    Route.get("/ownervehicles", "OwnervehiclesController.find");
    // Listar por id (unico elemento)
    Route.get("/ownervehicles/:id", "OwnervehiclesController.find");
    // Crear
    Route.post("/ownervehicles", "OwnervehiclesController.create");
    // Actualizar
    Route.put("/ownervehicles/:id", "OwnervehiclesController.update");
    // Borrar
    Route.delete("/ownervehicles/:id", "OwnervehiclesController.delete");
})//.middleware(["security"])