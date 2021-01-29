import morgan from 'morgan'
import express from 'express'

export default function buildMiddleware(app) {
    app.use(morgan('tiny'))
    app.use(express.json())
    app.use(express.static('public'))
}