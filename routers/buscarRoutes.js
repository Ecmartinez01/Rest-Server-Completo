const { Router } = require("express")
const { buscar } = require("../controllers/buscar")

const rutas = Router();

rutas.get("/:collection/:termino",buscar)

module.exports= rutas