import Route from '@ioc:Adonis/Core/Route'
Route.group(() => {
    // Listar todos los elementos
    Route.get("/restaurants", "RestaurantsController.find");
    // Listar por id (unico elemento)
    Route.get("/restaurants/:id", "RestaurantsController.find");
    // Crear
    Route.post("/restaurants", "RestaurantsController.create");
    // Actualizar
    Route.put("/restaurants/:id", "RestaurantsController.update");
    // Borrar
    Route.delete("/restaurants/:id", "RestaurantsController.delete");
})//.middleware(["security"])