const response_valid = (status, data, message, res) => {
    res.json({
        message: message,
        data: data,
        status: status,
    });
}

module.exports = response_valid
