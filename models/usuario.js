const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const usuarioSchema = Schema({
  nombre: {
    type: String,
    required: [true, "El nombre es obligatorio"],
  },
  correo: {
    type: String,
    required: [true, "El correo es obligatorio"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "La constraseña es obligatoria"],
  },
  imagen: {
    type: String,
  }, 
  rol: {
    type: String,
    required: true,
    enum: ["ADMIN_ROL", "USER_ROL","VENTAS_ROL"],
  },
  estado: {
    type: Boolean,
    default: true,
  },
  google: {
    type: Boolean,
    default: false,
  },
  
});

usuarioSchema.methods.toJSON = function () {
  const {__v,password, ...usuario} = this.toObject();
  return usuario
} 
module.exports = model("Usuario", usuarioSchema);
