const responseOk = (response) =>{
    return {
        statusHttp: 200,
        response
    };
};

module.exports = responseOk;