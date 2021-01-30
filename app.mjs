// third party packages
import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import morgan from 'morgan'


// express app
const app = express()
const { PORT, DEV_PROD } = process.env
// custom
import dbConnection from './models/connection/db.connection.mjs'
import userRoutes from './routes/user.routes.mjs'
import sauceRoutes from './routes/sauce.routes.mjs'


app.use(cors())
dotenv.config()
dbConnection()

if (DEV_PROD === "DEV"){
    app.use(morgan('tiny'))
}

app.use(express.json())
app.use('/public', express.static('./public'))


app.use('/api/auth', userRoutes)
app.use('/api/sauces', sauceRoutes)



app.listen(PORT || 3000, ()=> console.log(`Je tourne sur le port ${PORT ? PORT : 3000}`)) 