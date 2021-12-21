const {Schema,model } = require("mongoose")
const productosSchema =Schema({
    nombre:{
        type:String,
        required:[true,"El nombre es requerido"],
        unique:true
    },
    estado:{
        type:Boolean,
        default:true,
        required:true
    },
    usuario:{
        type:Schema.Types.ObjectId,
        ref:"Usuario",
        required:true
    },
    categoria:{
        type:Schema.Types.ObjectId,
        ref:"Categoria",
        required:true
    },
    precio:{
        type:Number,
        default: 0,
    },
    descripcion:{ type:String},
    
    disponible:{ type:Boolean,default:true},
    img:{ type:String}

})
productosSchema.methods.toJSON = function () {
    const {__v,estado,disponible, ...producto} = this.toObject();
    return producto
  } 
module.exports = model("Producto",productosSchema)