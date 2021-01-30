import jwt from 'jsonwebtoken'

export default  (req , res, next)=>{
try{
    const token = req.headers.authorization.split(' ')
    const vToken = jwt.verify(token[1], "A14ErfBTG8er2416542")
    const userId = vToken.userId
    console.log(userId)
    console.log(req.body.userId)

    if(req.body.userId && req.body.userId !== userId){
       throw  new Error("Echec de l'authentification") 
    }
    else{
        next()
    }
}
catch(err) {
        throw err
    }
}