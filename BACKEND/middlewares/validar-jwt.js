const { response } = require('express')
const jwt = require('jsonwebtoken')

const validarJWT = ( req, res = response, next ) => {

    //x-token por los headers
    const token = req.header('x-token')

    if (!token) {
        return res.status(401).json({
            ok: false,
            msg: 'No hay token en la petición'
        })
    }

    //Valida el token recibido en la petición:
    try {
        
        const payload = jwt.verify(
            token,
            process.env.SECRET_JWT_SIGN
        )

        req.uid = payload.uid
        req.nombre = payload.nombre
        
            
    } catch (error) {
        console.log('validarJWT: ', error);
        return res.status(401).json({
            ok: false,
            msg: 'Token no válido'
        })
        
    }

    next()
}

module.exports = {
    validarJWT
}