const { Schema, model } = require('mongoose')

const EventoSchema = Schema({
    title: {
        type: String,
        required: true,
    },
    notes: {
        type: String,
    },
    start: {
        type: Date,
        required: true,
    },
    end: {
        type: Date,
        require: true,
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'usuario',
        required: true,
    }
})

//Esto es para que la respuesta al Frontend no se envien datos innecesarios que nacen por defecto en la base de datos 
//Tbn vamos a cambiar el _id creado por defecto por id y no se enviará la versión _v
//Explicación video 352 Grabar el evento en la base de datos:
EventoSchema.method('toJSON', function() {
    const { __v, _id, ...object } =this.toObject()
    object.id = _id
    return object
})

module.exports = model('Evento', EventoSchema)