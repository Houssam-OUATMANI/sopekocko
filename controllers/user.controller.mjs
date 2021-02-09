  import bcrypt from 'bcrypt'
  import jwt from 'jsonwebtoken'
  
  import User from '../models/schema/user.schema.mjs'
  import userValidation from '../validation/user.validation.mjs'
  
 // Inscription vtrl 
  const signup = (req ,res) => {
    const { password, email } = req.body

    // validation JOI
    const {error} = userValidation(req.body)
    if (error) return res.status(400).json({ error : error.details[0].message})

    // hash mdp
    bcrypt.hash(password, 12)
    .then(hash => {
      const user = new User({ email : email, password: hash })
     // sauvegarde db
      user.save()
        .then(()=> res.status(201).json({message : "User created!"}))
        // err sauvegarde ex non unique ou non valide
        .catch(err => res.status(400).json({err}))
   })
   // err db
   .catch(err => res.status(500).json({err}))
}


/*****  connexion ctrl  ******/
 const login =(req ,res) => {
    const {email , password} = req.body

    const {error} = userValidation(req.body)
    if (error) return res.status(400).json({ error : error.details[0].message})

// user est dans la db ?
    User.findOne({email})
      .then(user => {
        if(!user)return res.statud(401).json({message : "Unauthorized"})

// mdp du form est-il pareil que celui dans la db ?
        bcrypt.compare(password, user.password)
        .then(match => {
          if (!match) return res.status(401).json({ err: 'Mot de passe incorrect !' })

//tout est ok
            res.status(200).json({
              userId : user._id,
              token : jwt.sign( {userId :user._id}, "A14ErfBTG8er2416542", {expiresIn : "24h"})
          })
        })
// err bcrypt
        .catch(err => res.status(500).json({err}))
      })
//err db
      .catch(err => res.status(500).json({err}))
}


export { signup , login }
