// third party packages
import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import morgan from 'morgan'
import helmet from 'helmet'


// express app
const app = express()
// custom
import dbConnection from './models/connection/db.connection.mjs'
import userRoutes from './routes/user.routes.mjs'
import sauceRoutes from './routes/sauce.routes.mjs'


app.use(cors())
app.use(helmet())
dotenv.config()

// BDD 
dbConnection()


// log en mode dev
const {  DEV_PROD } = process.env
if (DEV_PROD === "DEV"){
    app.use(morgan('tiny'))
}


// parse json
app.use(express.json())
// static folder
app.use('/public', express.static('./public'))


 // routes middelwares
app.use('/api/auth', userRoutes)
app.use('/api/sauces', sauceRoutes)


export default app
