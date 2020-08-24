"use strict";

module.exports = (schema, data) => {
  let { value, error } = schema.validate(data, { abortEarly: false });

  if (error) {
    let messages = {};
    error.details.forEach((err) => {
      messages[err.path[0]] = err.message;
    });
    error = messages;
  }

  return { value, error };
};
