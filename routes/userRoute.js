const express = require("express");
const { createUser, logIn, logOut } = require("../controllers/user");

const api = express.Router();

api.route("/signup").post(createUser);

api.route("/login").post(logIn);

api.route("/logout").post(logOut);

module.exports = api;
