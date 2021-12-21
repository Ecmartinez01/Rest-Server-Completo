const res = require("express/lib/response");
const Categoria = require("../models/categoria");
const Producto = require("../models/producto");
const Rol = require("../models/Rol");
const Usuario = require("../models/usuario");


const esRolValido = async(rol = '')=>{
    const existeRol = await Rol.findOne({rol})
    if(!existeRol){
        throw new Error(`El rol ${rol} no esta registrado en la BD`) 
    }
}

const validarCorreo = async(correo = '')=> {

   const repetido = await Usuario.findOne({ correo });
  if (repetido) {
    throw new Error(`el correo ${correo} ya existe`)
    // return res.status(400).json({
    //   error: "Ese correo ya existe",
    // });
  }
}

const elIdExiste = async(id)=> {

  const existeUsuario = await Usuario.findById(id);
 if (!existeUsuario) {
   throw new Error(`el id ${id} no existe`)
   // return res.status(400).json({
   //   error: "Ese correo ya existe",
   // });
 }
}

const existeCategoria = async(id)=> {

  const existeCategoriaId = await Categoria.findById(id);
 if (!existeCategoriaId) {
   throw new Error(`La categoria con id: ${id} no existe`)
   // return res.status(400).json({
   //   error: "Ese correo ya existe",
   // });
 }

}
const existeProducto = async(id)=> {

  const existeProductoId = await Producto.findById(id);
 if (!existeProductoId) {
   throw new Error(`La producto con id: ${id} no existe`)
   // return res.status(400).json({
   //   error: "Ese correo ya existe",
   // });
 }

}

const validarColecciones = (coleccion= '',colecciones=[])=>{
  if (!colecciones.includes(coleccion)) {
    throw new Error `Las coleccion ${coleccion} no es valida -- ${colecciones}`
  }
  return true 
}
module.exports = {
    esRolValido,
    validarColecciones,
    validarCorreo,
    elIdExiste,
    existeCategoria,
    existeProducto
}