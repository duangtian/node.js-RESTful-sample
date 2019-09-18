const express = require('express');
const logging = require('morgan');

const app = express();

app.use(logging('dev'));

const customersRoute = require('./api/routes/customer_data');

app.use('/api/customers/', customersRoute);

app.use((req, res, next) =>{
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
})

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
})



module.exports = app;