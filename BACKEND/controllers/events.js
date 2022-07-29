const { response } = require('express')
const Evento = require('../models/Evento')

const getEventos = async (req, res = response ) => {

    const { uid } = req

    try {
        
        const eventos = await Evento.find().populate('usuario','nombre correo')
        
        res.status(201).json({
            ok: true,
            msg: 'getEventos completed',
            eventos
        })

    } catch (error) {
        console.log('getEventos: ', error);
        res.status(500).json({
            ok: false,
            msg: 'Hubo un error en getEventos'
        })
    }

}

const crearEvento = async (req, res = response ) => {

    // const haber = req.body
    const {uid } = req       //Estos vienen de validar el token del middleware

    const evento = new Evento (req.body)
    evento.usuario = uid

    try {
        await evento.save()
        
        res.json({
            ok: true,
            msg: 'Evento creado',
            evento
        })

    } catch (error) {
        console.log('crearEvento Error: ', error);
        res.status(500).json({
            ok: false,
            msg: 'Hubo un error creando el evento'
        })
    }

}

const updateEvento = async (req, res = response ) => {

    const { id } = req.params
    const { uid } = req                 //Esto viene de validar el token del middleware

    //Válida el id del parametro enviado para no dañar la consulta a Mongo
    if ( id.length < 24 || id.length > 24) {
        return res.status(404).json({
            ok: false,
            msg: 'Id enviado no válido. Los ids de Mongo son de 24 dígitos'
        })
    }

    const evento = await Evento.findById(id)
    
    //Comprueba si encontró el evento
    if ( !evento ) {
        return res.status(404).json({
            ok: false,
            msg: 'Evento no existe con id enviado'
        })
    }

    //Un usuario solo puede editar los eventos que creó él,no el de otros:
    if ( evento.usuario.toString() !== uid ) {
        return res.status(401).json({
            ok: false,
            msg: 'No estás autorizado para editar este evento'
        })
    }

    //Datos del nuevo evento:
    const nuevoEvento = {
        ...req.body,
        user: uid
    }

    try {
        //Explicación de esta linea en video 354 Actualizar un Evento Minuto 9:50
        const eventoActualizado = await Evento.findByIdAndUpdate( id,nuevoEvento, { new: true} )

        res.json({
            ok: true,
            msg: 'Update evento',
            evento: eventoActualizado
        })
    } catch (error) {
        console.log('updateEvento error: ', error);

        res.status(500).json({
            ok: true,
            msg: 'Error en updateEvento',
        })
        
    }

}

const deleteEvento = async (req, res = response ) => {

    const { id } = req.params
    const { uid } = req                 //Esto viene de validar el token del middleware

    //Válida el id del parametro enviado para no dañar la consulta a Mongo
    if ( id.length < 24 || id.length > 24) {
        return res.status(404).json({
            ok: false,
            msg: 'Id enviado no válido. Los ids de Mongo son de 24 dígitos'
        })
    }

    const evento = await Evento.findById(id)
    
    //Comprueba si encontró el evento
    if ( !evento ) {
        return res.status(404).json({
            ok: false,
            msg: 'Evento no existe con id enviado'
        })
    }

    //Un usuario solo puede borrar los eventos que creó él,no el de otros:
    if ( evento.usuario.toString() !== uid ) {
        return res.status(401).json({
            ok: false,
            msg: 'No estás autorizado para eliminar este evento'
        })
    }

    try {
    
        const eventoEliminado = await Evento.findByIdAndDelete(id)
        
        res.json({
            ok: true,
            msg: 'Evento eliminado correctamente',
            evento: eventoEliminado
        })

    } catch (error) {
        console.log('deleteEvento error: ', error);

        res.status(500).json({
            ok: true,
            msg: 'Error en deleteEvento',
        })  
    }

}


module.exports = {
    getEventos,
    crearEvento,
    updateEvento,
    deleteEvento
}