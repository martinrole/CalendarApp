const { Schema, model } = require('mongoose')

const UsuarioSchema = Schema({
    nombre: {
        type: String,
        required: true
    },
    correo: {
        type: String,
        required: true,
        unique: true
    },
    contrasena: {
        type: String,
        required: true
    }
})

module.exports = model('usuario', UsuarioSchema)