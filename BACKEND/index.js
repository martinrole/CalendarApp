const express = require('express')
const { dbConnection } = require('./database/config')       //Conecta la base de datos
require('dotenv').config()                                  //Sirve para crear variables de entorno
const cors = require('cors')

//console.log(process.env)


//Crear el servidor de express
const app = express()

//Inicializar base de datos:
dbConnection()

//CORS: Sirve para restringir las peticiones al servidor de direcciones o páginas puntuales
app.use(cors())

//Directorio Público:
app.use(express.static('public'))


//Lectura y parseo del body:
app.use(express.json())



//Rutas:
app.use('/api/auth', require('./routes/auth'))
app.use('/api/events', require('./routes/events'))




//Escuchar peticiones
app.listen(process.env.PORT, () => {
    console.log(`Servidor corriendo en puerto ${process.env.PORT}`)
})