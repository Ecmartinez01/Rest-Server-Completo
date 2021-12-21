const { response } = require("express");

const esAdminRol = (req,res = response, next)=>{
    if(!req.usuario){
        return    res.status("500").json({
            msg:"Tiene que validar el token primero"
        })
    }
    const {estado,nombre} = req.usuario
    if (estado !== "ADMIN_ROL") {
        return res.status("401").json({
            msg:`${nombre} no es un administrador`
        })
    }
    next()
}

const tieneRol = (...roles)=>{
 return (req,res,next)=>{
    if(!req.usuario){
        return res.status("500").json({
            msg:"Tiene que validar el token primero"
        })
    }
     if(!roles.includes(req.usuario.rol)){
         return res.status("401").json({
             msg:`Tiene que ser alguno de estos roles ${roles}` 
         })
     }   
    next()
 }
}
module.exports = {
    esAdminRol,
    tieneRol
}