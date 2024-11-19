import Route from '@ioc:Adonis/Core/Route'
Route.group(() => {
    // Listar todos los elementos
    Route.get("/shifts", "ShiftsController.find");
    // Listar por id (unico elemento)
    Route.get("/shifts/:id", "ShiftsController.find");
    // Crear
    Route.post("/shifts", "ShiftsController.create");
    // Actualizar
    Route.put("/shifts/:id", "ShiftsController.update");
    // Borrar
    Route.delete("/shifts/:id", "ShiftsController.delete");
})//.middleware(["security"])