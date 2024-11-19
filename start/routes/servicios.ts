import Route from '@ioc:Adonis/Core/Route'
Route.group(() => {
    // Listar todos los elementos
    Route.get("/servicios", "ServiciosController.find");
    // Listar por id (unico elemento)
    Route.get("/servicios/:id", "ServiciosController.find");
    // Crear
    Route.post("/servicios", "ServiciosController.create");
    // Actualizar
    Route.put("/servicios/:id", "ServiciosController.update");
    // Borrar
    Route.delete("/servicios/:id", "ServiciosController.delete");
})//.middleware(["security"])