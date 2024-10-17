const {constants} = require('../constants');
const errorHandler = (err, req, res, next) => {
    const statusCode = res.status ? res.status : 500;
    switch (statusCode) {
        case constants.Validation_Error:
            res.json({
                tittle: "Validation Failed",
                message: err.message,
                stackTrace: err.stack
            });
            break;
    
        case constants.Unauthorized:
            res.json({
                tittle: "Unauthorized",
                message: err.message,
                stackTrace: err.stack
            });
            break;
        
        case constants.Forbidden:
            res.json({
                tittle: "Forbidden",
                message: err.message,
                stackTrace: err.stack
            });
            break;
        
        case constants.Not_Found:
            res.json({
                tittle: "Not Found",
                message: err.message,
                stackTrace: err.stack
            });
            break;
        
        case constants.Internal_Server_Error:
            res.json({
                tittle: "Internal Server Error",
                message: err.message,
                stackTrace: err.stack
            });
            break;
        default:
            console.log('No Error, All good');
            break;
    }
};

module.exports = errorHandler;