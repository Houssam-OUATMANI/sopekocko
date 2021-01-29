// build in modules
import path  from 'path'
// third party packages
import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'


// express app
const app = express()
// custom
import corsControl from './middlewares/cors.middleware.mjs'
import buldMidleware from './middlewares/build.middleware.mjs'
import dbConnection from './models/connection/db.connection.mjs'
import userRoutes from './routes/user.routes.mjs'
import sauceRoutes from './routes/sauce.routes.mjs'


app.use(cors())
dotenv.config()
//corsControl(app)
dbConnection()

//app.use(morgan('tiny'))
app.use(express.json())
app.use('/public', express.static('./public'))


app.use('/api/auth', userRoutes)
app.use('/api/sauces', sauceRoutes)



const { PORT } = process.env
app.listen(PORT || 3000, ()=> console.log(`Je tourne sur le port ${PORT ? PORT : 3000}`)) 