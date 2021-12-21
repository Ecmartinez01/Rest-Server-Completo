const { Router } = require("express");
const { check } = require("express-validator");
const { loginControler, googleSignin } = require("../controllers/auth");
const { validaCampos} = require("../middlewares/validar-campos")

const rutas = Router();

rutas.post(
  "/login",
  [check("correo", "Debe ser un correo valido").isEmail(),
  check("password", "La contraseña es obligatoria").not().isEmpty(),
  validaCampos
    ],loginControler
);
rutas.post("/google",[
  check("id_token", "Es necesario el id Token").not().isEmpty(),
  validaCampos
],googleSignin
);
module.exports = rutas;
