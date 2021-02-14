import fs from 'fs'
import Sauce from '../models/schema/sauce.schema.mjs'
import sauceValidation from '../validation/sauce.validation.mjs'


// toutes les sauces de la db
const allSauces = (req, res)=>{
    Sauce.find()
    .then(sauces => res.status(200).json(sauces))
    .catch(error => res.status(500).json({ error }))
}

// une sauce avec id
const oneSauce = (req, res)=>{
     Sauce.findById(req.params.id)
    .then(sauce => {
        if (!sauce){
            res.status(404).json({message : "non trouvée"})
        }
        res.status(200).json(sauce)
    })
    .catch(error => res.status(500).json({ error }))
}

// creation sauce
const createSauce = (req , res)=> {
    const {protocol , file, body} = req
    const validSauce = {
        ...JSON.parse(body.sauce),
    }
     delete validSauce.userId
     const { error } =  sauceValidation(validSauce)

    if (error) return res.status(400).json({ error : error.details[0].message})


    const sauce = new Sauce({
        ...JSON.parse(body.sauce),
        imageUrl : `${protocol}://${req.get('host')}/public/images/${file.filename}`
    })

    sauce.save()
    .then(()=> res.status(201).send('sauce crée'))
    .catch(error => res.status(500).send(error))
}

// modification sauce
const updateSauce = (req ,res)=> {
    const {file , body, params ,protocol} = req
    let updatedSauce
    Sauce.findById(req.params.id)
    .then(sauce => {
       if(!sauce) return res.status(404).json({message : "non trouvée"})
       if(!file){
         delete body.userId  
         const { error } =  sauceValidation(body) 
        if (error) return res.status(400).json({ error : error.details[0].message})

            updatedSauce = { ...body }
             console.log(updatedSauce)
             Sauce.updateOne({_id : params.id}, {...updatedSauce, _id : params.id})
             .then(() => res.status(200).json({message : "updated"}))
             .catch(error => res.status(400).json({error}))
       }else{
            updatedSauce ={
                    ...JSON.parse(body.sauce), 
                    imageUrl : `${protocol}://${req.get('host')}/public/images/${file.filename}`
                }

                const image = sauce.imageUrl.split('images/')[1]
                fs.unlink(`public/images/${image}`, ()=> {
                    Sauce.updateOne({_id : params.id}, {...updatedSauce, _id : params.id})
                    .then(() => res.status(204).json({message : "updated"}))
                    .catch(error => res.status(400).json({error}))
                })
       }
    })
}

// supression Sauce
const deleteSauce = (req ,res)=> {
    Sauce.findById(req.params.id)
        .then(sauce => {
            if(!sauce) return res.status(404).json({message : "non trouvée"})
            const image = sauce.imageUrl.split('images/')[1]
            fs.unlink(`public/images/${image}`, ()=> {
                Sauce.deleteOne({_id : req.params.id})
                .then(() => res.status(200).json({ message: 'Sauce supprimé !'}))
                .catch(error => res.status(400).json({ error }));
            })
        })
        .catch(error => res.status(500).json({ error }))
}

// likes
const likedSauce = (req ,res) => {
    const { like , userId } = req.body
    const { id } = req.params

    Sauce.findById(req.params.id)
    .then((sauce)=> {
       if(like === 1){
        if(! sauce.usersLiked.includes(userId)){
            Sauce.updateOne({_id: id }, {$push : { usersLiked : userId }, $inc : {likes : 1}, _id : id})
            .then(() => res.status(200).json({ message: 'Liked!' }))
            .catch((error) => {res.status(400).json({error})})
        }
       }
       else if (like === -1){ 
        if(! sauce.usersDisliked.includes(userId)){
            Sauce.updateOne({_id :id}, {$push : {usersDisliked : userId}, $inc : {dislikes : 1}, _id : id})
            .then(() => res.status(200).json({ message: 'Disliked!' }))
            .catch((error) => {res.status(400).json({error})})
    }
       }
       else if (like === 0){
           console.log(like)
         if (sauce.usersLiked.includes(userId)){
            Sauce.updateOne({_id :id}, {$pull : {usersLiked : userId}, $inc : {likes : -1}, _id : id})
            .then(() => res.status(200).json({ message: 'Liked' }))
            .catch((error) => {res.status(400).json({error})})
         }
         else if(sauce.usersDisliked.includes(userId)){
            Sauce.updateOne({_id :id}, {$pull : {usersDisliked : userId}, $inc : {dislikes : -1}, _id : id})
            .then(() => res.status(200).json({ message: 'Liked' }))
            .catch((error) => {res.status(400).json({error})})
         }
       }
    })
}

export { allSauces, oneSauce, createSauce, updateSauce, deleteSauce, likedSauce }