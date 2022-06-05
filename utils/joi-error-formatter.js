module.exports = function (errors) {
    let formattedError = [];

    errors.forEach(error => {
        formattedError.push({
            field: error.path[0],
            message: error.message
        });
    });

    return formattedError;
}