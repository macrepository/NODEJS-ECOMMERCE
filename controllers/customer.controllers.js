const { joiErrorFormat, isObjectIDValid } = require('../utils');
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
async function __get(req, res) {
    const customerId = req.params.id;
    let customer = {};

    if (customerId) {

        if (!isObjectIDValid(customerId)) return res.status(400).send("Invalid customer ID provided.");

        customer = await Customer.findById(customerId);

        if (!customer) return res.status(400).send("Customer with the given ID not found.");
    } else {
        customer = await Customer.find();
    }

    res.send(customer);
}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
async function __put(req, res) {
    const customerId = req.params.id;
    const reqCustomer = req.body;
    const { error } = validateCustomer(reqCustomer);

    if (!isObjectIDValid(customerId)) return res.status(400).send("Invalid customer ID provided.");

    if (error) return res.status(400).send(joiErrorFormat(error.details));

    const customer = await Customer.findByIdAndUpdate(customerId, {
        $set: {
            firstname: reqCustomer.firstname,
            lastname: reqCustomer.lastname,
            gender: reqCustomer.gender,
            dob: reqCustomer.dob
        }
     }, { new: true });

     if (!customer) res.status(400).send("Customer with the given ID not found.");

     res.send(customer);
}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
async function __delete(req, res) {
    const customerId = req.params.id;

    if (!isObjectIDValid(customerId)) return res.status(400).send("Invalid customer ID provided.");

    const customer = await Customer.findByIdAndRemove(customerId);

    if (!customer) return res.status(400).send("Customer with the given Id not found.");

    res.send(customer);
}

module.exports = {
    __post,
    __get,
    __put,
    __delete
}