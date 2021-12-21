const { request, response } = require("express")
const jwt = require("jsonwebtoken")
const Usuario = require("../models/usuario")




const validarJWT = async(req = request,res= response,next)=>{
    const token = req.header('token')
    if(!token){
        return res.status(401).json({
            msj:"no hay un token el la peticion"
        })
    }
    try {

        const {uid} = jwt.verify(token,process.env.SECRETORPRIVATEKEY)   

        //leer el usuario que corresponde al uid
        const usuario = await Usuario.findById(uid)
        //verificar si existe usuario con token
        if (usuario === null) {
          return  res.status(401).json({
                msj:"Token invalido - no existe ne la BD"
            }) 
        }
        // verificar si el uid tiene estado true
        if (usuario.estado === false){
            return res.status(401).json({
                msj:"Token invalido - estado false"
            })
        }
        
       
        req.usuario = usuario        
        
        next()
    } catch (error) {
        console.log(error)
        res.status(400).json({
            msj:"No hay token"
        })
        
    }
   
 

}
module.exports = {
    validarJWT
}