const passwordComplexity = require('joi-password-complexity');
const Joi = require('joi');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const customerSchema = new Schema({
    entityId : { type: Number, unique: true },
    firstname : { type: String, min: 3, max: 50, required: true },
    lastname : { type: String, min: 3, max: 50, required: true },
    gender : { type: Number,  enum: [1, 2, 3], required: true},
    dob : { type: Date, max: Date.now, required: true },
    email : {
        type: String, 
        unique: true, 
        required: true,
        validate: [
            {
                validator: function(v) {
                    return v.match(/[.a-zA-Z0-9]+@[a-zA-Z0-9]+.[a-zA-Z]+/i);
                },
                message: "email must be valid."
            }
        ]
    },
    password : { type: String, min: 6, max: 255, required: true}
}, {
    timestamps: true
  });

const Customer = mongoose.model('customer', customerSchema);

const complexityOptions = {
    min: 6,
    max: 255,
    lowerCase: 1,
    upperCase: 0,
    numeric: 1,
    symbol: 0,
    requirementCount: 2
};

/**
 * 
 * @param {*} customer 
 * @returns 
 */
function validateCustomer(customer)
{
    const customerSchema = Joi.object({
        firstname: Joi.string().min(3).max(50).required(),
        lastname: Joi.string().min(3).max(50).required(),
        gender: Joi.number().valid(1, 2, 3).required(),
        dob: Joi.date().less('now').required(),
        email: Joi.string().max(50).email({ allowFullyQualified: true }).required(),
        password: passwordComplexity(complexityOptions).required(),
        repeatPassword: Joi.ref('password')
    });

    return customerSchema.validate(customer, { abortEarly: false });
}

module.exports = {
    Customer,
    validateCustomer
}