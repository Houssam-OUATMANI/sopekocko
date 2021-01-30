import mongoose from 'mongoose'

const sauceSchema =  mongoose.Schema({
    userId : {
        type : String,
        required : true
    },
    name : {
        type : String,
        minLength : [1 , " min autorisé 1"],
        maxLength : [50 , " max autorisé 50"],
        required: true
    },
    manufacturer : {
        type : String,
        minLength : [1 , " min autorisé 1"],
        maxLength : [50 , " max autorisé 50"],
        required: true
    },
    description : {
        type : String,
        minLength : [1 , " min autorisé 1"],
        maxLength : [255 , " max autorisé 255"],
        required: true
    },
    mainPepper : {
        type : String,
        minLength : [1 , " min autorisé 1"],
        maxLength : [255 , " max autorisé 50"],
        required: true
    },
    imageUrl : {
        type : String,
        required : true
    },
    heat : {
        type : Number,
        required: true
    },
    likes: {
        type: Number,
        default : 0
         },
    dislikes: {
        type: Number,
        default : 0
     },
    usersLiked: {type: [String]},
    usersDisliked: {type: [String]},
    date : {
        type : Date,
        default : Date.now()
    }
})

export default  mongoose.model('Sauce', sauceSchema)