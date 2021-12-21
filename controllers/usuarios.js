const { response, request, query } = require("express");
const bcryptjs = require("bcryptjs");
const Usuario = require("../models/usuario");

/// GETTT OBTENER USUARIOS

const getUsuario = async(req = request, res = response) => {
  const {limit = 10,desde=0} = req.query
  const query = {estado:true}
  const [usuario,total] = await Promise.all([
     Usuario.find(query).limit(Number(limit)).skip(Number(desde))
    ,Usuario.countDocuments(query)
  ])
  res.json({
    total,
    usuario
  });
};
/// PUT 
const usuarioPut = async(req = request, res = response) => {
    const id = req.params.id
    const {_id,password,google,correo, ...resto} = req.body
    if(password){
      const vueltas = bcryptjs.genSaltSync()
      resto.password = bcryptjs.hashSync(password,vueltas)
    } 
    const usuario= await Usuario.findByIdAndUpdate(id,resto)
  res.json({
    usuario
  });
};

// POST insertar
const usuarioPost = async (req, res = response) => {
  
  const { nombre, correo, password, rol } = req.body;
  const usuario = new Usuario({ nombre, correo, password, rol });

  ///ENCRIPTAR CONTRASEÑA
  const vueltas = bcryptjs.genSaltSync(10);
  usuario.password = bcryptjs.hashSync(password, vueltas);

  //-------------------GUARDAR EN DB
  await usuario.save();

  res.json({
    usuario,
  });
};
//------------------------------------BORRAR DATOS DE REQ BODY
const usuarioDelete = async(req, res = response) => {
  const {id} = req.params
  // const usuarioDelete = await Usuario.findByIdAndDelete(id)
  const usuario= await Usuario.findByIdAndUpdate(id,{estado:false})
  res.json({msj:"Borrado con exito. (Inhabilitado)",usuario})
};

//--------------------------------------------PATCH
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
