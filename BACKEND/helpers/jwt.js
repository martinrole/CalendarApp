const jwt = require('jsonwebtoken')

const generarJWT = (uid, nombre) => {
    return new Promise ( (resolve, reject) => {

        const payload = { uid, nombre }

        //Explicación video 342 Json Web Token
        jwt.sign(payload,process.env.SECRET_JWT_SIGN, {
            expiresIn: '2h',
        }, ( error, token ) => {
            if ( error ) {
                console.log('JWT Error: ', error);
                reject( 'No se pudo generar el token' )
            }

            resolve( token )
        })
        
    })
}

module.exports = {
    generarJWT
}