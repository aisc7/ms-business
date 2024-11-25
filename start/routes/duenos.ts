import Route from '@ioc:Adonis/Core/Route'
Route.group(() => {
    // Listar todos los elementos
    Route.get("/duenos", "DuenosController.find");
    // Listar por id (unico elemento)
    Route.get("/duenos/:id", "DuenosController.find");
    // Crear
    Route.post("/duenos", "DuenosController.create");
    // Actualizar
    Route.put("/duenos/:id", "DuenosController.update");
    // Borrar
    Route.delete("/duenos/:id", "DuenosController.delete");
})//.middleware(["security"])