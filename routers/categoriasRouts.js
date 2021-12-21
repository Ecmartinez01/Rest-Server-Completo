const { Router } = require("express");
const { check } = require("express-validator");
const { obtenerCategorias, obtenerCategoriaPorId, guardarCategoria, actualizarCategoria, borrarCategoria } = require("../controllers/categorias");
const { elIdExiste, esRolValido, existeCategoria } = require("../helpers/db-validators");
const { validaCampos} = require("../middlewares/validar-campos");
const { esAdminRol } = require("../middlewares/validar-roles");
const {validarJWT} = require("../middlewares/validarJWT")

const rutas = Router()

// Obtener todas las categorias 
rutas.get("/", obtenerCategorias)

//Obtener una sola categoria por id
rutas.get("/:id", [
    check("id","No es un ID valido").isMongoId(),
    check("id").custom(existeCategoria),
    validaCampos
],obtenerCategoriaPorId)

//Crear categoria - privado - cualquier persona con un token valido
rutas.post("/",[
    validarJWT,
    check("nombre","El nombre es obligatorio").not().isEmpty(),
    validaCampos
], guardarCategoria)

//Actualizar - privado -cualquiera con token valido
rutas.put("/:id",[
    validarJWT,
    check("id","El id debe ser un ID valido").isMongoId(),
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("id").custom(existeCategoria)
] ,actualizarCategoria)


//Borra una categoria - admin
rutas.delete("/:id",[
    validarJWT,
    esAdminRol,
    check("id","Tiene que ser un id valido").isMongoId(),
    check("id").custom(existeCategoria),
    validaCampos
], borrarCategoria)

module.exports=rutas