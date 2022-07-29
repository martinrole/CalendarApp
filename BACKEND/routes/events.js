const { Router } = require('express')
const router = Router()
const { getEventos, crearEvento, updateEvento, deleteEvento } = require('../controllers/events')
const { validarJWT } = require('../middlewares/validar-jwt')
const { check } = require('express-validator')      //Validador de peticiones del Frontend
const { validarCampos } = require('../middlewares/validar-campos')
const { esFecha } = require('../middlewares/validar-fechas')

//Rutas de Eventos:
// host + /api/events


//Todas las peticiones deben pasar por el middleware de validar JWT:
router.use( validarJWT )

//Obtener eventos:
router.get('/', getEventos )


router.post('/create',
    [
        check('title', 'El titulo es obligatorio').not().isEmpty(),
        check('start', 'Fecha inicio del evento es obligatorio').custom( esFecha ),
        check('end', 'Fecha Fin del evento es obligatorio').custom( esFecha ),
        validarCampos
    ],
    crearEvento
)


router.put('/:id', updateEvento )



router.delete('/:id', deleteEvento )



module.exports = router