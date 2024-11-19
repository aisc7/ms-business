import Route from '@ioc:Adonis/Core/Route'
Route.group(() => {
    // Listar todos los elementos
    Route.get("/products", "ProductsController.find");
    // Listar por id (unico elemento)
    Route.get("/products/:id", "ProductsController.find");
    // Crear
    Route.post("/products", "ProductsController.create");
    // Actualizar
    Route.put("/products/:id", "ProductsController.update");
    // Borrar
    Route.delete("/products/:id", "ProductsController.delete");
})//.middleware(["security"])