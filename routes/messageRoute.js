const express = require("express");
const { sendMessage, getMessages } = require("../controllers/message");
const { protectRoute } = require("../middlewares/protectRoute");

const apiMessage = express.Router();

apiMessage.route("/:id").get(protectRoute, getMessages);
apiMessage.route("/send/:id").post(protectRoute, sendMessage);

module.exports = apiMessage;
