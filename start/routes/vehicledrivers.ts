import Route from '@ioc:Adonis/Core/Route'
Route.group(() => {
    // Listar todos los elementos
    Route.get("/vehicledrivers", "VehicledriversController.find");
    // Listar por id (unico elemento)
    Route.get("/vehicledrivers/:id", "VehicledriversController.find");
    // Crear
    Route.post("/vehicledrivers", "VehicledriversController.create");
    // Actualizar
    Route.put("/vehicledrivers/:id", "VehicledriversController.update");
    // Borrar
    Route.delete("/vehicledrivers/:id", "VehicledriversController.delete");
})