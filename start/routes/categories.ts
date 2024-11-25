import Route from '@ioc:Adonis/Core/Route'
Route.group(() => {
    // Listar todos los elementos
    Route.get("/categories", "CategoriesController.find");
    // Listar por id (unico elemento)
    Route.get("/categories/:id", "CategoriesController.find");
    // Crear
    Route.post("/categories", "CategoriesController.create");
    // Actualizar
    Route.put("/categories/:id", "CategoriesController.update");
    // Borrar
    Route.delete("/categories/:id", "CategoriesController.delete");
})//.middleware(["security"])