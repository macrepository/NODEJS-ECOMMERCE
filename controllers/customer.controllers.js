const { joiErrorFormat, isObjectIDValid } = require('../utils');
const _ = require('lodash');
const bcrypt = require('bcrypt');
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

    let customerObject = _.pick(reqCustomer, ['firstname', 'lastname', 'gender', 'dob', 'email', 'addresses']);
    
    const salt = await bcrypt.genSalt(10);
    customerObject.password = await bcrypt.hash(reqCustomer.password, salt);

    try {
        const customerModel = new Customer(customerObject);
        const customer = await customerModel.save();

        const token = customer.generateJwtToken();

        res
            .header('x-auth-token', token)
            .send(_.pick(customer, ['_id', 'firstname', 'lastname', 'email']));
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

        customer = await Customer
            .findById(customerId)
            .populate('addresses');
       
        if (!customer) return res.status(400).send("Customer with the given ID not found.");
    } else {
        customer = await Customer
            .find()
            .populate('addresses');
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

    if (error) return res.status(400).send(joiErrorFormat(error.details));

    if (!isObjectIDValid(customerId)) return res.status(400).send("Invalid customer ID provided.");

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

async function __login(req, res) {
    const reqCust = req.body;
    // const { error } = validateAuth(reqCust);
    // if (error) return res.status(400).send(error.message);

    const customer = await Customer.findOne({ email: reqCust.email });
    
    if (!customer) return res.status(400).send("Invalid username and password.");

    const validPassword = await bcrypt.compare(reqCust.password, customer.password);
    
    if (!validPassword) return res.status(400).send("Invalid customer and password");

    const token = customer.generateJwtToken();

    res
        .header('x-auth-token', token)
        .send(_.pick(customer, ['_id', 'firstname', 'lastname', 'email']));
}

async function __me(req, res) {
    res.send("Hello ");
}

module.exports = {
    __post,
    __get,
    __put,
    __delete,
    __login,
    __me
}