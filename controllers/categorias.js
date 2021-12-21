const { response, request, query } = require("express");
const Categoria = require("../models/categoria");


///OBTENER TODAS LAS CATEGORIAS
const obtenerCategorias = async(req,res= response,next)=>{
    const {limite = 10, desde = 1} = req.query
    const query = {estado:true} 
    const [total,categorias] = await Promise.all([
        Categoria.countDocuments(query),
        Categoria.find(query)
        .populate("usuario","nombre")
        .limit(Number(limite))
        .skip(Number(desde)),
    ])
    res.status(200).json({
        total,
        categorias
    })
}
// OBTENER CATEGORIA POR ID
const obtenerCategoriaPorId = async(req,res= response,next)=>{
   const {id} = req.params
   
   const categoria = await Categoria.findById(id).populate("usuario","nombre")

    res.status(200).json({
        categoria
    })
}
// CREAR CATEGORIA 
const guardarCategoria = async(req = request,res= response,next)=>{
   const nombre = req.body.nombre.toUpperCase()
   const existeCat = await Categoria.findOne({nombre})
    if (existeCat) {
       return res.status(401).json({
            msj:`La categoria: ${nombre} ya existe` 
        })
    }
    //generar categoria 
    const data = {
        nombre,
        usuario: req.usuario._id
    }
    // crear la categoria con la data
    const categoria = new Categoria(data)
    // guadar la categoria en la base de datos 
    await categoria.save()
   
   res.status(200).json({
        msg:"Guardado con exito",
        categoria
    })
}

// ACTUALIZAR CATEGORIA
 const actualizarCategoria = async(req,res= response,next)=>{
    const id = req.params.id
    const {_id,estado,usuario,...resto} = req.body    
    resto.nombre = resto.nombre.toUpperCase()
    resto.usuario = req.usuario._id
    const categoria =await Categoria.findByIdAndUpdate(id,resto)
    res.status(200).json(categoria)
 }
// BORRAR CATEGORIA
 const borrarCategoria = async(req,res= response,next)=>{
    const {id} = req.params
    const categoriaDelete = await Categoria.findByIdAndUpdate(id,{estado:false})
     res.status(200).json({
         msg:"Eliminado con exito..",
         categoriaDelete
     })
 }

module.exports ={
    obtenerCategorias,
    obtenerCategoriaPorId,
    guardarCategoria,
    actualizarCategoria,
    borrarCategoria

}