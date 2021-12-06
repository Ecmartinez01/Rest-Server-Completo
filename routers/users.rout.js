const { Router } = require("express");
const { getUsuario, usuarioPut, usuarioPost, usuarioDelete, usuarioPatch } = require("../controllers/usuarios");
const rutas = Router();

rutas.get("/", getUsuario);

rutas.put("/:id", usuarioPut);

rutas.post("/", usuarioPost);

rutas.delete("/", usuarioDelete);

rutas.patch("/",usuarioPatch)
module.exports = rutas