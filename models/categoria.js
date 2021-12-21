const { Schema,model } = require("mongoose")

const SchemaCategoria = Schema({
    nombre:{
        type:String,
        required:[true,"El usuario debe se obligatorio"]
    },
    estado:{
        type:Boolean,
        required:true,
        default: true
    },
    usuario:{
        type:Schema.Types.ObjectId,
        ref:"Usuario",
        required:true
        }
})
SchemaCategoria.methods.toJSON = function () {
    const {__v,esatdo, ...categooria} = this.toObject();
  
    return categooria
  } 
module.exports = model("Categoria",SchemaCategoria)