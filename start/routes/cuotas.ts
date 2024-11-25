import Route from '@ioc:Adonis/Core/Route'
Route.group(() => {
    // Listar todos los elementos
    Route.get("/cuotas", "CuotasController.find");
    // Listar por id (unico elemento)
    Route.get("/cuotas/:id", "CuotasController.find");
    // Crear
    Route.post("/cuotas", "CuotasController.create");
    // Actualizar
    Route.put("/cuotas/:id", "CuotasController.update");
    // Borrar
    Route.delete("/cuotas/:id", "CuotasController.delete");
})//.middleware(["security"])