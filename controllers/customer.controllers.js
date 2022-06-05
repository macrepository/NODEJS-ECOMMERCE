const { joiErrorFormat } = require('../utils');
const { Customer, validateCustomer } = require('../models/customer');

/**
 * 
 * @param {ob} req 
 * @param {*} res 
 */
async function __post(req, res) {
    const reqCustomer = req.body;
    const { error } = validateCustomer(reqCustomer);
    
    if (error) return res.status(400).send(joiErrorFormat(error.details));

    const customerObject = {
        firstname: reqCustomer.firstname,
        lastname: reqCustomer.lastname,
        gender: reqCustomer.gender,
        dob: reqCustomer.dob,
        email: reqCustomer.email,
        password: reqCustomer.password,
        repeatPassword: reqCustomer.repeatPassword
    }

    try {
        const customerModel = new Customer(customerObject);
        const customer = await customerModel.save();

        res.send(customer);
    } catch (error) {
        let errorMessage = '';
        let { errors } = error;

        for (const field in errors) {
            errorMessage += errors[field].message + "\n";
        }

        res.status(400).send(errorMessage);
    }
}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
function __get(req, res) {
    res.send("hello 124");
}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
function __put(req, res) {

}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
function __delete(req, res) {

}

module.exports = {
    __post,
    __get,
    __put,
    __delete
}