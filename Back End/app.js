const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan')
const mongoose = require('mongoose')
const cors = require('cors')
dotenv.config({ path: 'config.env' })
const server = express();
const PORT = process.env.PORT || 8000
const ErrorHandling = require('./utilles/err')
const RouterCtagoray = require('./Routes/catagory')
const RouterSubCatagory = require('./Routes/subCatagory')
const RouterProudcts = require('./Routes/proudcts')
const RouterUsers = require('./Routes/user')

// first middel ware 
// secand middel ware

mongoose.connect(process.env.BD_URI).then(() => {
    server.listen(PORT, () => {
        console.log("MongoDB Conection ....")
        console.log("server Conection & Listen to port : " + PORT)
    })
})

// midel ware Routes 

server.use(morgan('tiny'));
server.use(express.json())
server.use(express.urlencoded({ extended: true, limit: '5mb' }));

server.use(cors())
server.use('/catagory', RouterCtagoray)
server.use('/subcatagory', RouterSubCatagory)
server.use('/proudcts', RouterProudcts)
server.use('/users', RouterUsers)



// middel ware handling Error

server.use((req, res, next) => {
    next(new ErrorHandling(`Error : link is not Found ${req.originalUrl}`, 400))
})

//middel ware Error
server.use((error, req, res, next) => {
    // res.status(400).send(error)
    error.statusCode = error.statusCode || 500
    error.status = error.status || 'error'
    res.status(error.statusCode).json({
        status: error.status,
        error: error,
        massage: error.message,
        stack: error.stack
    })
})

// handling Error outer Express --->Example MongoDB
process.on('unhandledRejection', ((err) => {
    console.log(`unhandledRejection : ${err}`)
}))





