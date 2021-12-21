const path = require("path");
const { v4: uuidv4 } = require('uuid'); 

const subirArchivo = (archivos,extensionesValidas = ["png", "jpg", "gif", "jpeg"],carpeta = '')=> {
     return new Promise((resolve,reject)=>{
        const {archivo}  = archivos;

    const splitArchivo = archivo.name.split(".");
    const extension = splitArchivo[splitArchivo.length - 1];

    if (!extensionesValidas.includes(extension)) {
      return reject( `La extension: ${extension} no es valida, deben ser alguna de estas: ${extensionesValidas}`);
    }
   const uuidNombre = uuidv4()+"."+extension 
   
  
    const ruta = path.join(__dirname, "../uploads/",carpeta, uuidNombre);
  
    archivo.mv(ruta, (err) => {
      if (err) {
        return reject(err)
      }
  
     resolve( uuidNombre)
      });
    });

}
module.exports = subirArchivo