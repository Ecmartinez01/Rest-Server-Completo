const { response,request, query } = require("express");
const getUsuario = (req = request, res = response) => {
    const {q = "no definido",nombre,apikey,page = "1",limit="12"} = req.query
    res.json({
    msj: "Get API -CONTROLER",
    q,
    nombre,
    apikey,
    page,
    limit    
  });
};

const usuarioPut = (req = request, res = response) => {
    const id = req.params.id
    res.json({
    msj: "Put API Controler",
    id
  });
};

const usuarioPost = (req, res = response) => {
    const {nombre,edad} = req.body
  res.json({
    msj: "Post API Controler",
    nombre, edad     
  });
};

const usuarioDelete = (req, res = response) => {
  res.json({
    msj: "Delete API controler",
  });
};

const usuarioPatch = (req, res = response) => {
  res.json({
    msj: "Patch API Controler",
  });
};
module.exports = {
  getUsuario,
  usuarioPut,
  usuarioPost,
  usuarioDelete,
  usuarioPatch,
};
