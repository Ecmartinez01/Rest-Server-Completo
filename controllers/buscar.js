const { response } = require("express");
const { ObjectId } = require("mongoose").Types;
const Producto = require("../models/producto");
const Usuario = require("../models/usuario")
const Categoria = require("../models/categoria")

const colleccionesPermitidas = ["categorias", "productos", "usuarios", "roles"];

const buscarProductos = async(termino = '', res)=>{
   
    const esMongoId = ObjectId.isValid(termino)
   
    if (esMongoId) {
       const producto = await Producto.findById(termino).populate("categoria","nombre")
      return res.status(200).json({
           msg:(producto) ? [producto] : []
       })
   }

   const expIrregular = new RegExp(termino, "i")
   const producto  = await Producto.find({nombre:expIrregular, estado:true}).populate("categoria","nombre")
   res.json({
       msg: producto
   })
}

const buscarPersonas = async(termino = '', res)=>{
   
    const esMongoId = ObjectId.isValid(termino)
   
    if (esMongoId) {
       const usuario = await Usuario.findById(termino)
      return res.status(200).json({
           msg:(usuario) ? [usuario] : []
       })
   }

   const expIrregular = new RegExp(termino ='', "i")
   const producto  = await Usuario.find({
    $or:[{nombre:expIrregular},{correo:expIrregular} ],
    $and:[{estado:true}] 
    })
 return  res.json({
       msg: producto
   })
}

const buscarCategorias = async(termino = '', res)=>{
   
    const esMongoId = ObjectId.isValid(termino)
   
    if (esMongoId) {
       const categoria = await Categoria.findById(termino)
      return res.status(200).json({
           msg:(categoria) ? [categoria] : []
       })
   }

   const expIrregular = new RegExp(termino, "i")
   const categoria  = await Categoria.find({nombre:expIrregular, estado:true})
   res.json({
       msg: categoria
   })
}

const buscar = async (req, res = response) => {
  const { collection, termino } = req.params;
  if (!colleccionesPermitidas.includes(collection)) {
    return res.status("400").json({
      msj: `La colecciones permitidas son: ${colleccionesPermitidas} `,
    });
  }

  switch(collection) {
    case "productos":
         return buscarProductos(termino,res)
    case "categorias":
         return buscarCategorias(termino,res)
    case "usuarios":
        return buscarPersonas(termino,res)
    default:
    return  res.status(500).json({
          msg:"sorry"
      })
  }
};
module.exports = {
  buscar,
};
