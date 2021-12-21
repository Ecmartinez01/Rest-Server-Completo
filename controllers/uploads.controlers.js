const path = require('path');
const fs   = require('fs');

const cloudinary = require("cloudinary").v2
cloudinary.config(process.env.CLOUDINARY_URL)
const { response } = require('express');
const subirArchivo = require('../helpers/subir-archivo');
const Usuario = require('../models/usuario');
const Producto = require('../models/producto');
const { model } = require('mongoose');
const { Console } = require('console');


const cargarArchivo = async(req, res = response) => {


    try {
        
        // txt, md
        // const nombre = await subirArchivo( req.files, ['txt','md'], 'textos' );
        const nombre = await subirArchivo( req.files, undefined, 'imgs' );
        res.json({ nombre });

    } catch (msg) {
        res.status(400).json({ msg });
    }

}


const actualizarImagenCloudinary = async(req, res = response ) => {

    const { id, colecciones } = req.params;

    let modelo;

    switch ( colecciones ) {
        case 'usuarios':
            modelo = await Usuario.findById(id);
            if ( !modelo ) {
                return res.status(400).json({
                    msg: `No existe un usuario con el id ${ id }`
                });
            }
        
        break;

        case 'productos':
            modelo = await Producto.findById(id);
            if ( !modelo ) {
                return res.status(400).json({
                    msg: `No existe un producto con el id ${ id }`
                });
            }
        
        break;
    
        default:
            return res.status(500).json({ msg: 'Se me olvidó validar esto'});
    }


    // Limpiar imágenes previas
    if (modelo.img) {
    const nombreArr = modelo.img.split("/")
    const nombreConExtension = nombreArr[nombreArr.length-1]
    const [public_id] = nombreConExtension.split(".")
     cloudinary.uploader.destroy(public_id)
    }
 // __dirname, "../uploads/",colecciones, modelo.img
     const {tempFilePath}=req.files.archivo
     const {secure_url} = await cloudinary.uploader.upload(tempFilePath)
    modelo.img = secure_url
    await modelo.save()

    res.json( modelo );

}



const mostrarImagen = async(req,res= response) =>{
    const { id, colecciones } = req.params;

    let modelo;

    switch ( colecciones ) {
        case 'usuarios':
            modelo = await Usuario.findById(id);
            if ( !modelo ) {
                return res.status(400).json({
                    msg: `No existe un usuario con el id ${ id }`
                });
            }
        
        break;

        case 'productos':
            modelo = await Producto.findById(id);
            if ( !modelo ) {
                return res.status(400).json({
                    msg: `No existe un producto con el id ${ id }`
                });
            }
        
        break;
    
        default:
            return res.status(500).json({ msg: 'Se me olvidó validar esto'});
    }


    // enviar imagen
    if (modelo.img) {
        const rutaImg = path.join(__dirname,"../uploads/",colecciones, modelo.img)
      
        if (fs.existsSync(rutaImg)) {
            return res.sendFile(rutaImg)
        } 
    }else {
        const rutaNoimg = path.join(__dirname,"../assets/no-image.jpg")
        return res.sendFile(rutaNoimg)
    }
    
 // __dirname, "../uploads/",colecciones, modelo.img

    res.json( {msg:"FALTA EL PLACE HOLDER"} );

}

module.exports = {
    cargarArchivo,
    actualizarImagenCloudinary,
    mostrarImagen
}