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
module.exports = {
    esRolValido,
    validarCorreo,
    elIdExiste
}