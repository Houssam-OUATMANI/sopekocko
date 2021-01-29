import mongoose from 'mongoose'

export default function databaseConnexion(){
    const {DB_NAME , DB_USER , DB_PASSWORD} = process.env

    const URI = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster-de-developpemen.29257.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`
    mongoose
    .connect(URI,{useNewUrlParser :true , useUnifiedTopology :true , useCreateIndex : true})
    .then(()=> console.log("CONNECTED TO THE DATABASE"))
    .catch(e => console.log(e))
}