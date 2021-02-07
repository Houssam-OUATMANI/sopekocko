import {Router} from 'express'

const router = Router()

import multer from '../middlewares/multer.middleware.mjs'
import auth from '../middlewares/auth.middleware.mjs'
//import auth from '../middlewares/'

import { allSauces, oneSauce, createSauce, updateSauce , deleteSauce, likedSauce } from '../controllers/sauce.controller.mjs'


router.get('/',auth, allSauces)

router.get('/:id',auth, oneSauce)

router.post('/',auth , multer, createSauce)

router.post('/:id/like',auth, likedSauce)

router.put('/:id',auth, multer, updateSauce)

router.delete('/:id',auth, deleteSauce)





export default router