import Route from '@ioc:Adonis/Core/Route'
Route.group(() => {
    // Listar todos los elementos
    Route.get("/administrators", "AdministratorsController.find");
    // Listar por id (unico elemento)
    Route.get("/administrators/:id", "AdministratorsController.find");
    // Crear
    Route.post("/administrators", "AdministratorsController.create");
    // Actualizar
    Route.put("/administrators/:id", "AdministratorsController.update");
    // Borrar
    Route.delete("/administrators/:id", "AdministratorsController.delete");
})//.middleware(["security"])