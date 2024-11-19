import Route from '@ioc:Adonis/Core/Route'
Route.group(() => {
    // Listar todos los elementos
    Route.get("/vehiculos", "VehiculosController.find");
    // Listar por id (unico elemento)
    Route.get("/vehiculos/:id", "VehiculosController.find");
    // Crear
    Route.post("/vehiculos", "VehiculosController.create");
    // Actualizar
    Route.put("/vehiculos/:id", "VehiculosController.update");
    // Borrar
    Route.delete("/vehiculos/:id", "VehiculosController.delete");
})//.middleware(["security"])