const bcryptjs = require("bcryptjs")
const {request,response} = require("express")
const { generarJWT } = require("../helpers/GenerarJWT")
const { googleVerify } = require("../helpers/google-verify")
const Usuario = require("../models/usuario")
const loginControler = async(req = request,res = response)=>{
    const {correo,password} = req.body
    
    try {
        //VERIFICAR SI EL USUARIO EXISTE POR MEDIO DE SU CORREO(UNICO)
        const usuario = await Usuario.findOne({correo})
        if (!usuario) {
            return res.status(400).json({
                msj:"Usuario o contraseña no son correctos - correo" 
            })
        }
        //VALIDAR EL ESTADO DE USUARIO
        if (!usuario.estado) {
            return res.status(400).json({
                msj: "El usuario esta inactivo - estado false"
            })
        }
        /// Validar PASSWORD
        const validPassword = bcryptjs.compareSync(password,usuario.password)
        if (!validPassword) {
            return res.status(400).json({
                msj: "Contraseña incorrecta"
            })
        }
        // CREAR EL TOKEN DEL USUARIO
        const token = await generarJWT(usuario.id)
        res.json({
            msj:"Logueado exitosamente",
            usuario,
            token
        })     
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg:"Algo salio mal comuniquese con el administrador"
        })
    }
}

const googleSignin = async(req, res = response,nex)=>{
    const {id_token} = req.body
    try {
        const {nombre,imagen,correo}= await googleVerify(id_token)
        // console.log(googleUser)
        let usuario = await Usuario.findOne({correo})
        if (!usuario) {
            //creamos el usuario 
            const data = {
                nombre,
                correo,
                password:":p",
                imagen,
                rol:"USER_ROL",
                google:true
            }
            usuario = new Usuario(data)
            await usuario.save()
            
        }
        /// si el usuario no esta en DB
        if(!usuario.estado){
            return res.status(400).json({
                msg:"Debe comunicarse con el administrador"
            })
        }
        /// generar el jwt
        const token = await generarJWT(usuario.id) 

        res.json({
            usuario,
            token,
        })
    } catch (error) {
        console.log(error)
        res.status(400).json({
            msg:"El token no se pudo verificar"
        })
    }
}

 module.exports = {
     loginControler,
    googleSignin
    }
