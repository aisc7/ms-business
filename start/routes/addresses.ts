import Route from '@ioc:Adonis/Core/Route'
Route.group(() => {
    // Listar todos los elementos
    Route.get("/addresses", "AddressesController.find");
    // Listar por id (unico elemento)
    Route.get("/addresses/:id", "AddressesController.find");
    // Crear
    Route.post("/addresses", "AddressesController.create");
    // Actualizar
    Route.put("/addresses/:id", "AddressesController.update");
    // Borrar
    Route.delete("/addresses/:id", "AddressesController.delete");
})//.middleware(["security"])