const express = require("express");
const cors = require("cors");
const { dbConecction } = require("../DataBase/config");
const fileUpload = require("express-fileupload");
class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.rutaUser = "/api/usuarios"
    this.rutaAuth = "/api/auth"
    this.rutaCategoria = "/api/categorias"
    this.rutaProductos = "/api/productos"
    this.rutaBuscar = "/api/buscar"
    this.rutaUploads = "/api/uploads"
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
    // Carga de archivos
    this.app.use(fileUpload({
      useTempFiles : true,
      tempFileDir : '/tmp/',
      createParentPath:true
  }));
  }

  routes() {
  //  this.app.use(this.rutaUser,require("../routers/users.rout"))
   this.app.use(this.rutaAuth,require("../routers/auth.rout"))
   this.app.use(this.rutaUser,require("../routers/users.rout"))
   this.app.use(this.rutaCategoria,require("../routers/categoriasRouts"))
   this.app.use(this.rutaBuscar,require("../routers/buscarRoutes"))
   this.app.use(this.rutaProductos,require("../routers/productsRouts"))
   this.app.use(this.rutaUploads,require("../routers/uploads.routs"))
  }
  listen() {
    this.app.listen(this.port, () => {
      console.log("Corriendo en el puerto " + this.port);
    });
  }
}
module.exports = Server;
