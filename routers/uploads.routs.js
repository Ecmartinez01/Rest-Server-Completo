const {Router } = require("express")
const { check } = require("express-validator")
const { cargarArchivo, mostrarImagen, actualizarImagenCloudinary } = require("../controllers/uploads.controlers")
const { validarColecciones } = require("../helpers/db-validators")
const { validarArchivo } = require("../middlewares/validar-archivo")
const rutas  = Router()
const {validaCampos} = require("../middlewares/validar-campos")

rutas.post("/",validarArchivo ,cargarArchivo)
rutas.put("/:colecciones/:id",[
    validarArchivo,
    check("id", "No es un ID valido").isMongoId(),
    check("colecciones").custom( (c)=>(validarColecciones(c,["usuarios","productos"]))),
    validaCampos
],actualizarImagenCloudinary)

rutas.get("/:colecciones/:id",[
    check("id", "No es un ID valido").isMongoId(),
    check("colecciones").custom( (c)=>(validarColecciones(c,["usuarios","productos"]))),
    validaCampos
] ,mostrarImagen)

module.exports = rutas