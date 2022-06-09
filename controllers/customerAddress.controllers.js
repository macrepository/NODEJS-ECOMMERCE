const { joiErrorFormat, isObjectIDValid } = require('../utils');
const { Address } = require('../models/customer');

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
async function __post(req, res) {
    const reqAddress = req.body;

    //validate post data

    const addressObject = {
        street: reqAddress.street,
        barangay: reqAddress.barangay,
        city: reqAddress.city,
        country: reqAddress.country,
        zipCode: reqAddress.zipCode,
        phone: reqAddress.phone,
        type: reqAddress.type
    };

    const addressModel = new Address(addressObject);
    const address = await addressModel.save();

    res.send(address);
}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
async function __get(req, res) {
    const addressId = req.params.id;
    let address = {};

    if (addressId) {

        if (!isObjectIDValid(addressId)) return res.status(400).send("Invalid address ID provided");

        address = await Address.findById(addressId);
    } else {
        address = await Address.find();
    }

    res.send(address);
}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
async function __put(req, res) {
    const addressId = req.params.id;
    const reqAddress = req.body;

    //validate request address

    if (!isObjectIDValid(addressId)) return res.status(400).send('Invalid address ID provided.');

    const address = await Address.findByIdAndUpdate(addressId, {
        $set: {
            street: reqAddress.street,
            barangay: reqAddress.barangay,
            city: reqAddress.city,
            country: reqAddress.country,
            zipCode: reqAddress.zipCode,
            phone: reqAddress.phone,
            type: reqAddress.type
        }
    }, { new: true });

    res.send(address);
}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
async function __delete(req, res) {
    const addressId = req.params.id;

    if (!isObjectIDValid(addressId)) return res.status(400).send("Invalid address ID provided");

    const address = await Address.findByIdAndRemove(addressId);

    res.send(address);
}

module.exports = {
    __post,
    __get,
    __put,
    __delete
}