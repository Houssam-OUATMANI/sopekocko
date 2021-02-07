import multer from 'multer'
import { v4 as uuidv4 } from 'uuid';


const mimeTypes = {
    "image/png" : "png",
    "image/jpg" : "jpg",
    "image/jpeg" : "jpeg",
    "image/bmp" : "bmp",
    "image/gif" : "gif",
    "image/webp" : "webp"
}

//  traitement des fichiers images
const fileStore = multer.diskStorage({
    destination: (req , file , cb) => {
        cb(null, 'public/images')
    },
    filename: (req ,file , cb) => {
        const imageName = file.originalname.split(' ').join('_').toLowerCase().split(`.${mimeTypes[file.mimetype]}`)[0]
        const imageExt = mimeTypes[file.mimetype]
        cb(null ,`${imageName}_${uuidv4()}.${imageExt}`)
    }
})


export default multer({ storage  : fileStore }).single("image")