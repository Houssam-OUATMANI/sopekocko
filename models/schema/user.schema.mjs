import mongoose from 'mongoose'
import muv  from 'mongoose-unique-validator'



 const userSchema = mongoose.Schema({
    email : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true,
    },
    date : {
        type : Date,
        default : Date.now()
    }
})

mongoose.plugin(muv)

export default  mongoose.model('user', userSchema)