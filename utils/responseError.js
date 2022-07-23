const responseError = (statusHttp, response) => {
    return {
        statusHttp,
        response
    };
};

module.exports = responseError;