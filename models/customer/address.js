const mongoose = require('mongoose');

const adressSchema = new mongoose.Schema({
    street: { type: String, required: true },
    barangay: { type: String, maxlength: 255 , required: true},
    city: { type: String, maxlength: 255, required: true },
    country: { type: String, maxlength: 255, required: true },
    zipCode: { type: Number, maxlength: 10, required: true },
    phone: { type: String, maxlength: 20, required: true },
    type: { type: String, enum: ['shipping', 'billing'] }
}, { timestamps: true });

const Address = mongoose.model('customer_address', adressSchema);

module.exports = {
    Address
}