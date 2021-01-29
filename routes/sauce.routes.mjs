import {Router} from 'express'
const router = Router()

import multer from '../middlewares/multer.middleware.mjs'
//import auth from '../middlewares/'

import { allSauces, oneSauce, createSauce, updateSauce , deleteSauce  } from '../controllers/sauce.controller.mjs'


router.get('/',allSauces)

router.get('/:id', oneSauce)

router.post('/', multer, createSauce)

router.put('/:id', multer, updateSauce)

router.delete('/:id',  deleteSauce)






export default router