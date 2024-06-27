const express = require("express");
const { createUser } = require("../controllers/user");

const api = express.Router();

api.route("/").post(createUser);

module.exports = api;
