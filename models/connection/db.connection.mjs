import mongoose from 'mongoose'

export default function databaseConnexion(){
    const {DB_URI} = process.env
    mongoose
    .connect(`${DB_URI}`,{useNewUrlParser :true , useUnifiedTopology :true , useCreateIndex : true})
    .then(()=> console.log("db true"))
    .catch(e => console.log(e))
}
