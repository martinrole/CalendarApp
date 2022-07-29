const { response } = require('express')
const Usuario = require('../models/Usuario')
const bcrypt = require('bcryptjs')
const { generarJWT } = require('../helpers/jwt')


const crearUsuario = async (req, res = response ) => {
    
    const { nombre, correo, contrasena } = req.body

    try {

        let usuario = await Usuario.findOne({ correo: correo })
        
        if ( usuario ) {
            return res.status(400).json({
                ok: false,
                msg: 'correo ya fue registrado anteriormente'
            })
        }

        //Guarda usuario:
        usuario = new Usuario(req.body)
        const salt = bcrypt.genSaltSync(12)
        usuario.contrasena = bcrypt.hashSync(contrasena, salt)
        await usuario.save()

        //Generar JWT:
        const token = await generarJWT( usuario.id, usuario.nombre )
    
        //Respuesta de petición:
        res.status(201).json({
            ok: true,
            msg: 'user created',
            uid: usuario.id,
            nombre: usuario.nombre,
            token
        })
        
    } catch (error) {
        console.log('crearUsuario: ', error);
        res.status(500).json({
            ok: false,
            msg: 'Hubo un error creando el usuario'
        })
    }

}


const loginUsuario = async (req, res = response) => {
     
    const { correo, contrasena } = req.body

    try {
        
        //Valida que exista un correo
        const usuario = await Usuario.findOne({ correo: correo })
        
        if ( !usuario ) {
            return res.status(400).json({
                ok: false,
                msg: 'Usuario y/o contraseña no son correctos'
            })
        }

        //Valida las contraseñas:
        const validPass = bcrypt.compareSync(contrasena, usuario.contrasena)

        if (!validPass){
            return res.status(400).json({
                ok: false,
                msg: 'Usuario y/o contraseña no son correctos 2'
            })
        }

        //Generar JWT:
        const token = await generarJWT( usuario.id, usuario.nombre )

        //Generar JSON respuesta correcta:
        return res.status(201).json({
            ok: true,
            msg: 'login completed',
            uid: usuario.id,
            nombre: usuario.nombre,
            token
        })

    } catch (error) {
        console.log('loginUsuario: ', error);
        res.status(500).json({
            ok: false,
            msg: 'Hubo un error al realizar login'
        })
    }
    
}


const revalidarToken =  async (req, res = response) => {

    //Viene ya ajustado del middelware validarJWT aplicado a la ruta:
    const { uid, nombre } = req

    //Genera nuevo JWT:
    const token = await generarJWT( uid, nombre )

    res.json({
        ok: true,
        msg: 'update token',
        token,
        uid,
        nombre
    })
}


module.exports = {
    crearUsuario,
    loginUsuario,
    revalidarToken
}