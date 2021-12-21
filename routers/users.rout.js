const { Router } = require("express");
const { check } = require("express-validator");

const { getUsuario, usuarioPut, usuarioPost, usuarioDelete, usuarioPatch } = require("../controllers/usuarios");
const { esRolValido, validarCorreo, elIdExiste } = require("../helpers/db-validators");
const { validaCampos } = require("../middlewares/validar-campos");
const { esAdminRol, tieneRol } = require("../middlewares/validar-roles");
const { validarJWT } = require("../middlewares/validarJWT");

const rutas = Router();

rutas.get("/", getUsuario);

rutas.put("/:id",[
     check("id","No es un ID valido").isMongoId(),
     check("id").custom(elIdExiste),
     check("rol").custom(esRolValido),
     validaCampos
],usuarioPut);

rutas.post("/", [
    check('nombre',"El nombre es obligatorio").not().isEmpty(),
    check('correo',"El correo no es valido").isEmail(),
    check('password',"La contraseña debe tener almenos 6 dijitos").isLength({min:6}),
    check('rol').custom(esRolValido ),
    check('correo').custom(validarCorreo),
    validaCampos
],usuarioPost); 

rutas.delete("/:id",[
    validarJWT,
    tieneRol("ADMIN_ROL","VENTAS_ROL"),
    //esAdminRol,
    check("id","No es un ID valido").isMongoId(),
    check("id").custom(elIdExiste),
    validaCampos
], usuarioDelete);

rutas.patch("/",usuarioPatch)
module.exports = rutas