"use strict";

module.exports = (schema, data) => {
  let { value, error } = schema.validate(data, { abortEarly: false });

  if (error) {
    error = error.details.map((err) => {
      console.log(err);
      return {
        path: err.path[0],
        message: err.message,
        stack: "",
      };
    });
  }

  return { value, error };
};
