import Route from '@ioc:Adonis/Core/Route'
Route.group(() => {
    // Listar todos los elementos
    Route.get("/municipalities", "MunicipalitiesController.find");
    // Listar por id (unico elemento)
    Route.get("/municipalities/:id", "MunicipalitiesController.find");
    // Crear
    Route.post("/municipalities", "MunicipalitiesController.create");
    // Actualizar
    Route.put("/municipalities/:id", "MunicipalitiesController.update");
    // Borrar
    Route.delete("/municipalities/:id", "MunicipalitiesController.delete");
})//.middleware(["security"])