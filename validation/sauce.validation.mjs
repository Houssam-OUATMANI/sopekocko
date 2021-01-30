import Joi from 'joi'

export default function  sauceValidation(body) {
    const schema = Joi.object({
        name : Joi.string().min(1).max(50).required(),
        manufacturer : Joi.string().min(1).max(50).required(),
        description : Joi.string().min(1).max(255).required(),
        mainPepper : Joi.string().min(1).max(255).required(),
        heat : Joi.number().required(),
    })

    return schema.validate(body)
}

