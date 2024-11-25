import Route from '@ioc:Adonis/Core/Route'
Route.group(() => {
    // Listar todos los elementos
    Route.get("/categoryproducts", "CategoryproductsController.find");
    // Listar por id (unico elemento)
    Route.get("/categoryproducts/:id", "CategoryproductsController.find");
    // Crear
    Route.post("/categoryproducts", "CategoryproductsController.create");
    // Actualizar
    Route.put("/categoryproducts/:id", "CategoryproductsController.update");
    // Borrar
    Route.delete("/categoryproducts/:id", "CategoryproductsController.delete");
})//.middleware(["security"])