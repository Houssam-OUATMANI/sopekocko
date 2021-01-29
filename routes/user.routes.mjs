import {Router} from 'express'
const router = Router()

import { signup , login } from '../controllers/user.controller.mjs'

// SignUp route
router.post('/signup',signup)

// login route
router.post('/login', login)

export default router