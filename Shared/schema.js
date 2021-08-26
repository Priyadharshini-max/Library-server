const Joi = require("joi");

const register = Joi.object({
    username: Joi.string().min(3).required(),
    email: Joi.string().min(4).required().email(),
    password: Joi.string().min(5).required()
})

const login = Joi.object({
    email: Joi.string().min(4).required().email(),
    password: Joi.string().min(5).required()
})

module.exports = {
    register,
    login

}