import Route from '@ioc:Adonis/Core/Route'
Route.group(() => {
    // Listar todos los elementos
    Route.get("/customers", "CustomersController.find");
    // Listar por id (unico elemento)
    Route.get("/customers/:id", "CustomersController.find");
    // Crear
    Route.post("/customers", "CustomersController.create");
    // Actualizar
    Route.put("/customers/:id", "CustomersController.update");
    // Borrar
    Route.delete("/customers/:id", "CustomersController.delete");
})//.middleware(["security"])