const express = require("express");
const cors = require("cors");
const { dbConecction } = require("../DataBase/config");
class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.rutaUser = "/api/usuarios"
    //conectar la bd
    this.conectarDB()
    // Middlewares
    this.middlewares();
    //Rutas de mi aplicacion
    this.routes();
  }
  //conectar a la base de datos

    async conectarDB(){
      await dbConecction()

    }
  middlewares() {
      //CORS
      this.app.use(cors())
      //parseo a JSON
      this.app.use(express.json())
    //directorio publico
    this.app.use(express.static("public"));
  }

  routes() {
  //  this.app.use(this.rutaUser,require("../routers/users.rout"))
   this.app.use(this.rutaUser,require("../routers/users.rout"))
  }
  listen() {
    this.app.listen(this.port, () => {
      console.log("Corriendo en el puerto " + this.port);
    });
  }
}
module.exports = Server;
