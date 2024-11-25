import Route from '@ioc:Adonis/Core/Route'
Route.group(() => {
    // Listar todos los elementos
    Route.get("/distributioncenters", "DistributioncentersController.find");
    // Listar por id (unico elemento)
    Route.get("/distributioncenters/:id", "DistributioncentersController.find");
    // Crear
    Route.post("/distributioncenters", "DistributioncentersController.create");
    // Actualizar
    Route.put("/distributioncenters/:id", "DistributioncentersController.update");
    // Borrar
    Route.delete("/distributioncenters/:id", "DistributioncentersController.delete");
})//.middleware(["security"])