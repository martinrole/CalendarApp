const mongoose = require('mongoose');

const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.DATABASE_CONNECTION);
        console.log('Database conectada')
    } catch (error) {
        console.log('dbConnection: ', error);
        throw new Error('Error al inicializar dataBase')
    }
}

module.exports = {
    dbConnection
}