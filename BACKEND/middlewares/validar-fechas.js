const moment = require('moment')

//Video explicación 351 Validar campos necesarios:
const esFecha = ( value, { req, location, path}) => {

    if (!value) {
        return false
    }

    const fecha = moment( value )

    if ( fecha.isValid() ) {
        return true
    } else {
        return false
    }
}

module.exports = { esFecha }