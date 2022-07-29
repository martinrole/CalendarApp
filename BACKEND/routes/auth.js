//Rutas de usuarios:
// host + /api/auth
const { Router } = require('express')
const router = Router()
//Controladores de rutas:
const { crearUsuario, loginUsuario, revalidarToken } = require('../controllers/auth')

const { check } = require('express-validator')      //Validador de peticiones del Frontend
const { validarCampos } = require('../middlewares/validar-campos')
const { validarJWT } = require('../middlewares/validar-jwt')

//Rutas:
router.post(
    '/',
    [   //Middlewares:
        check('correo', 'Email es obligatorio').isEmail(),
        check('contrasena', 'Contraseña incorrecta').isLength({min: 6 }),
        validarCampos
    ] ,
    loginUsuario
)


router.post(
    '/create', 
    [   //Middlewares:
        check('nombre', 'Nombre es obligatorio').not().isEmpty() ,
        check('correo', 'Email es obligatorio').isEmail(),
        check('contrasena', 'Contraseña debe de ser de 6 caracteres').isLength({min: 6 }),
        validarCampos
    ] ,
    crearUsuario
)



router.get('/updateToken', validarJWT, revalidarToken)



module.exports = router;
