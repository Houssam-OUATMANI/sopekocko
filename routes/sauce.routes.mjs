import {Router} from 'express'

const router = Router()

import multer from '../middlewares/multer.middleware.mjs'
import auth from '../middlewares/auth.middleware.mjs'
//import auth from '../middlewares/'

import { allSauces, oneSauce, createSauce, updateSauce , deleteSauce, likedSauce } from '../controllers/sauce.controller.mjs'

// toutes les sauces
router.get('/',auth, allSauces)

// une sauce avec id
router.get('/:id',auth, oneSauce)

// post nouvelle sauce
router.post('/',auth , multer, createSauce)

//  likes et dislikes
router.post('/:id/like',auth, likedSauce)

// maj d'une sauce existante avec id
router.put('/:id',auth, multer, updateSauce)

// suppression d'une sauce avec id
router.delete('/:id',auth, deleteSauce)



export default router