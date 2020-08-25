"use strict";

const formatError = (err) => {
    let name = err.name ? err.name : "";
    let path = err.path ? err.path : name;

    let formatedError = {
        name: name,
        path: path,
        message: err.message ? err.message : "",
        stack: err.stack ? err.stack : ""
    };

    return formatedError;
};

module.exports.json = (body = {}, status = 200) => {
    if (status >= 400 && typeof body == "object") {
        let fmtBody = { errors: [] };

        if (Array.isArray(body)) {
            fmtBody.errors = body.map(formatError);
        } else {
            fmtBody.errors.push(formatError(body));
        }

        body = fmtBody;
    }

    return {
        statusCode: status,
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": true
        },
        body: body != null ? JSON.stringify(body) : ""
    };
};
