import Route from '@ioc:Adonis/Core/Route'
Route.group(() => {
    // Listar todos los elementos
    Route.get("/naturalpersons", "NaturalPeopleController.find");
    // Listar por id (unico elemento)
    Route.get("/naturalpersons/:id", "NaturalPeopleController.find");
    // Crear
    Route.post("/naturalpersons", "NaturalPeopleController.create");
    // Actualizar
    Route.put("/naturalpersons/:id", "NaturalPeopleController.update");
    // Borrar
    Route.delete("/naturalpersons/:id", "NaturalPeopleController.delete");
})//.middleware(["security"])