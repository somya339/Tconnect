const Response = require('../utils/response');

const errorHandler = (err,req,res,next) => {
    let error = {...err};
    error.message = err.message;

    if(err.code === 11000) {
        const message = 'Duplicate field value entered';
        error = new Response(message,400);
    }

    if(err.name === 'ValidationError') {
        const message = Object.values(err.errors).map((val) => val.message);
        error = new Response(message,400);
    }

    res.status(error.statusCode || 500).json({
        success: false,
        error: error.message || 'Server error'
    });
}

module.exports = errorHandler;