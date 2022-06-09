const passwordComplexity = require('joi-password-complexity');
const Joi = require('joi');
const { Address } = require('./address');
const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
    firstname: { type: String, min: 3, maxlength: 50, required: true },
    lastname: { type: String, min: 3, maxlength: 50, required: true },
    gender: { type: Number,  enum: [1, 2, 3] },
    dob: { type: Date, max: Date.now, required: true },
    email: {
        type: String, 
        unique: true, 
        required: true,
        validate: [
            {
                validator: function(v) {
                    return v.match(/[.a-zA-Z0-9]+@[a-zA-Z0-9]+.[a-zA-Z]+/i);
                },
                message: "email must be valid."
            },
            {
                validator: function(v) {
                    return Customer.findOne({ email: v })
                        .then(customer => Promise.resolve(customer == null))
                        .catch(error => Promise.reject(false));
                },
                message: "email must be unique"
            }
        ]
    },
    password: { type: String, min: 6, maxlength: 255, required: true},
    addresses: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'customer_address'
    }]
}, {
    timestamps: true
  });

customerSchema.methods.getAddress = function() {
    return Address
        .find({ _id: {$in: this.addresses} });
}

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
        repeatPassword: Joi.ref('password'),
        addresses: Joi.array()
    });

    return customerSchema.validate(customer, { abortEarly: false });
}

module.exports = {
    Customer,
    validateCustomer
}