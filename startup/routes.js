const customerAddress = require('../routes/customerAddress.routes');
const customer = require('../routes/customer.routes');
const express = require('express');

module.exports = function (app) {
    //Views

    //Middleware
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    //Routes
    app.use('/customer/address', customerAddress);
    app.use('/customer', customer);
    
    app.all('*', (req, res) => {
        res.send('<h1>Page not found!</h1>');
    });
}