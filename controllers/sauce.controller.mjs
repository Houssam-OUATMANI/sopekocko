import fs from 'fs'
import Sauce from '../models/schema/sauce.schema.mjs'

// toutes les sauces de la db
const allSauces = (req, res)=>{
    Sauce.find()
    .then(sauces => res.status(200).json(sauces))
    .catch(err => console.log(err))
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
    .catch(err => console.log(err))
}

// creation sauce
const createSauce = (req , res)=> {
    const {protocol , file, body} = req
    const sauce = new Sauce({
        ...JSON.parse(body.sauce),
        imageUrl : `${protocol}://${req.get('host')}/public/images/${file.filename}`
    })
    sauce.save()
    .then(()=> res.status(201).send('sauce crée'))
    .catch(err => res.status(500).send(err))
}

// modification sauce

const updateSauce = (req ,res)=> {
    const {file , body, params ,protocol} = req
    let updatedSauce
    Sauce.findById(req.params.id)
    .then(sauce => {
       if(!sauce) return res.status(404).json({message : "non trouvée"})
       if(!file){
            updatedSauce = { ...body }
             console.log(updatedSauce)
             Sauce.updateOne({_id : params.id}, {...updatedSauce, _id : params.id})
             .then(() => res.status(204).json({message : "updated"}))
             .catch(err => res.status(400).json({err}))
       }else{
            updatedSauce ={
                    ...JSON.parse(body.sauce), 
                    imageUrl : `${protocol}://${req.get('host')}/public/images/${file.filename}`
                }

                const image = sauce.imageUrl.split('images/')[1]
                fs.unlink(`public/images/${image}`, ()=> {
                    Sauce.updateOne({_id : params.id}, {...updatedSauce, _id : params.id})
                    .then(() => res.status(204).json({message : "updated"}))
                    .catch(err => res.status(400).json({err}))
                })
       }
    })
}

const deleteSauce = (req ,res)=> {
    Sauce.findById(req.params.id)
        .then(sauce => {
            if(!sauce) return res.status(404).json({message : "non trouvée"})
            const image = sauce.imageUrl.split('images/')[1]
            fs.unlink(`public/images/${image}`, ()=> {
                Sauce.deleteOne({_id : req.params.id})
                .then(() => res.status(200).json({ message: 'Sauce supprimé !'}))
                .catch(err => res.status(400).json({ err }));
            })
        })
        .catch(err => res.status(500).json({ err }))
}




export { allSauces, oneSauce, createSauce, updateSauce, deleteSauce }