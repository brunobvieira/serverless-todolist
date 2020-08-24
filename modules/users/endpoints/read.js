"use strict";

const response = require("../../../shared/lib/response");

module.exports.get = (event, context, callback) => {
  // const body = event.body ? event.body : event;
  // const data = JSON.parse(body);

  response.json(callback, {
    name: "Bruno Beserra Vieiras",
  });
};
