const express = require("express");
const {
  createUser,
  logIn,
  logOut,
  getUsersForSidebar,
} = require("../controllers/user");

const { protectRoute } = require("../middlewares/protectRoute");

const api = express.Router();

api.route("/signup").post(createUser);

api.route("/login").post(logIn);

api.route("/logout").post(logOut);

api.route("/users").get(getUsersForSidebar);

module.exports = api;
