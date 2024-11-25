import Route from '@ioc:Adonis/Core/Route'
Route.group(() => {
    // Listar todos los elementos
    Route.get("/addrerouteorders", "AddrerouteordersController.find");
    // Listar por id (unico elemento)
    Route.get("/addrerouteorders/:id", "AddrerouteordersController.find");
    // Crear
    Route.post("/addrerouteorders", "AddrerouteordersController.create");
    // Actualizar
    Route.put("/addrerouteorders/:id", "AddrerouteordersController.update");
    // Borrar
    Route.delete("/addrerouteorders/:id", "AddrerouteordersController.delete");
})//.middleware(["security"])