const { Router } = require("express");
const { check } = require("express-validator");
const { crearProducto, obtenerProducto, obtenerProductoId, acutualizarProducto, borrarProducto } = require("../controllers/productos");
const { existeCategoria, existeProducto } = require("../helpers/db-validators");
const { validaCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validarJWT");

const rutas = Router()

//CREAR PRODUCTOS
rutas.post("/",[
    validarJWT,
    check("nombre","El nombre es obligatorio").not().isEmpty(),
    validaCampos
],crearProducto)
//OBTENER TODOS LOS PRODUCTOS
rutas.get("/",obtenerProducto)
//OBTENER PRODUCTO POR ID
rutas.get("/:id",[
    check("id","No es un ID valido").isMongoId(),
    check("id").custom(existeProducto),
    validaCampos
],obtenerProductoId)
//MODIFICAR PRODUCTOS
rutas.put("/:id",[
    validarJWT,
    check("id","El id debe ser un ID valido").isMongoId(),
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("id").custom(existeProducto)
],acutualizarProducto)
//BORRAR PRODUCTOS
rutas.delete("/:id",borrarProducto)

module.exports  = rutas