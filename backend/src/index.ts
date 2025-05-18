import "reflect-metadata";
import express from "express";
import { ODataServer, ODataController, Edm } from "@odata/server";

const app = express();

// Define your Entity
class Product {
  @Edm.Key
  @Edm.Int32
  public Id: number;

  @Edm.String
  public Name: string;
}

// Define your Controller
class ProductController extends ODataController {
  async find() {
    return [
      { Id: 1, Name: "Apple" },
      { Id: 2, Name: "Banana" }
    ];
  }
}

// Define your Server
class ProductServer extends ODataServer {
  @Edm.EntitySet("Products", ProductController)
  public Products: ProductController;
}

// Hook into Express
app.use("/odata", ProductServer.create());

const port = 3000;
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}/odata`);
});
