const { response } = require('express')
const { validationResult } = require('express-validator')

const validarCampos = (req, res = response, next) => {

    
    //Manejo de errores Video 334 MIn 7:05:
    const errores = validationResult(req)

    if (!errores.isEmpty()) {
        return res.status(400).json({
            ok: false,
            error: errores.mapped()
        })
    }


    next()
}

module.exports = {validarCampos}