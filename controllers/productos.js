const { response } = require("express")
const Producto = require("../models/producto")

const crearProducto = async(req,res= response)=>{

    const {nombre} = req.body;
    const existeProducto = await Producto.findOne({nombre}).populate("categoria","nombre")
    if (existeProducto) {
        res.json({
            msg:`el prroducto ${existeProducto.nombre} ya existe`
        })
    }
    const data = {
        nombre:req.body.nombre.toUpperCase(),
        usuario:req.usuario._id,
        categoria:req.body.categoria,
    }
    const producto = new Producto(data);
   
  
    //-------------------GUARDAR EN DB
    await producto.save();
  
    res.json({
      producto,
    });
}
const obtenerProducto = async(req,res= response)=>{
    const {limite = 10, desde = 1} = req.query
    const query = {estado:true} 
    const [total,producto] = await Promise.all([
        Producto.countDocuments(query),
        Producto.find(query)
        .populate("usuario","nombre")
        .limit(Number(limite))
        .skip(Number(desde)),
    ])
    res.status(200).json({
        total,
        producto
    })
}
const obtenerProductoId = async(req,res= response)=>{
    const {id} = req.params
   
    const producto = await Producto.findById(id).populate("usuario","nombre")
 
     res.status(200).json({
        producto
     })
}
const acutualizarProducto = async(req,res= response)=>{
    const id = req.params.id
    const {_id,categoria,usuario,...resto} = req.body    
    if(resto.nombre){
        resto.nombre = resto.nombre.toUpperCase()
    }
    resto.usuario = req.usuario._id
    const producto =await Producto.findByIdAndUpdate(id,resto)
    res.status(200).json(producto)
}
const borrarProducto = async(req,res= response)=>{
    const {id} = req.params
    const productoDelete = await Producto.findByIdAndUpdate(id,{estado:false})
     res.status(200).json({
         msg:"Eliminado con exito..",
         productoDelete
     })
    }
module.exports ={
    obtenerProducto,
    crearProducto,
    obtenerProductoId,
    acutualizarProducto,
    borrarProducto
}