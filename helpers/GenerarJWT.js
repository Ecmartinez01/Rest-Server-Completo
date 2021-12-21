const jwt = require('jsonwebtoken')

const generarJWT = (uid)=>{
    return new Promise( (res,rej)=>{
        const payload = {uid}
        jwt.sign(payload,process.env.SECRETORPRIVATEKEY,{
            expiresIn: "24h"
        },(err,token)=>{
            if (err) {
                console.log(err)
                rej("Algo salio mal con el token")
            }else{ 
                res(token)
            }
        })
    })
}   

module.exports= {
    generarJWT
}