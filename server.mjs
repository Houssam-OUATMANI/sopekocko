import http from 'http'

import app from './app.mjs'


const { PORT } = process.env
const server = http.createServer(app)



server.listen(+PORT || 3000, (error)=> console.log(error ? `error : ${error}` : `Je tourne  sur le port ${PORT ? PORT : 3000}`)) 