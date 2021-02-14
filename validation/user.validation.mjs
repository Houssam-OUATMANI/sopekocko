import Joi from 'joi'

export default function  userValidation(body) {
    const schema = Joi.object({
        email : Joi.string().email().required(),
        password : Joi.string().min(8).max(25).required()
    })

    return schema.validate(body)
}

//