const  {
    types,
    isKnownError,
    createUnknownError,
} = require('../errors');

/**
 * Here are several types of errors in the app. 
 * So handling of them is just a switch where is proper http status specified.
 * @param {*} e 
 * @param {*} ctx 
 */
function processError(e, ctx) {
    const {
        errorObject
    } = (isKnownError(e) ? e : createUnknownError(e));
    
    console.log(`got an error: ${JSON.stringify(errorObject, null, '\t')}`)
    
    const errorResponse  = {
        error: errorObject,
    }
  
    switch (errorObject.type) {
        case types.DATASOURCE_ERROR: 
            ctx.status = 404;
            break;
        default: 
            ctx.status = 500;
    }
    ctx.state = errorResponse;
    ctx.body = JSON.stringify(errorResponse);

    return;
}
  
module.exports = {
    processError,
}