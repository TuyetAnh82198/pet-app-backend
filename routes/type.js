const express = require("express");

const { getType } = require("../controllers/type.js");

const route = express.Router();

route.get("/get", getType);

module.exports = route;
