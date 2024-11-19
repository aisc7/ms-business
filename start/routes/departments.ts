import Route from '@ioc:Adonis/Core/Route'
Route.group(() => {
    // Listar todos los elementos
    Route.get("/departments", "DepartmentsController.find");
    // Listar por id (unico elemento)
    Route.get("/departments/:id", "DepartmentsController.find");
    // Crear
    Route.post("/departments", "DepartmentsController.create");
    // Actualizar
    Route.put("/departments/:id", "DepartmentsController.update");
    // Borrar
    Route.delete("/departments/:id", "DepartmentsController.delete");
})//.middleware(["security"])