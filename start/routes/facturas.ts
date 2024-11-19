import Route from '@ioc:Adonis/Core/Route'
Route.group(() => {
    // Listar todos los elementos
    Route.get("/facturas", "FacturasController.find");
    // Listar por id (unico elemento)
    Route.get("/facturas/:id", "FacturasController.find");
    // Crear
    Route.post("/facturas", "FacturasController.create");
    // Actualizar
    Route.put("/facturas/:id", "FacturasController.update");
    // Borrar
    Route.delete("/facturas/:id", "FacturasController.delete");

    Route.post('/facturas/:id/procesarPago', 'FacturasController.procesarPago')

})//.middleware(["security"])