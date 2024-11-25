import Route from '@ioc:Adonis/Core/Route'
Route.group(() => {
    // Listar todos los elementos
    Route.get("/companies", "CompaniesController.find");
    // Listar por id (unico elemento)
    Route.get("/companies/:id", "CompaniesController.find");
    // Crear
    Route.post("/companies", "CompaniesController.create");
    // Actualizar
    Route.put("/companies/:id", "CompaniesController.update");
    // Borrar
    Route.delete("/companies/:id", "CompaniesController.delete");
})//.middleware(["security"])