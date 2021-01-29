import multer from 'multer'


const mimeTypes = {
    "image/png" : "png",
    "image/jpg" : "jpg",
    "image/jpeg" : "jpg",
    "image/bmp" : "bmp",
    "image/gif" : "gif",
    "image/webp" : "webp"
}

const fileStore = multer.diskStorage({
    destination: (req , file , cb) => {
        cb(null, 'public/images')
    },
    filename: (req ,file , cb) => {
        const imageName = file.originalname.split(' ').join('_').toLowerCase()
        console.log(imageName)
        const imageExt = mimeTypes[file.mimetype]
        cb(null ,`${imageName}_${Date.now()}.${imageExt}`)
    }
})


export default multer({ storage  : fileStore }).single("image")