const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema(
  {
    //Reference to id of uUser schema
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    receiverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
  },

  //After the first object, once the message has been created, we will have createdAt and updatedAt fields and mongoose will automatically create those
  { timestamps: true }
);

module.exports = mongoose.model("Message", MessageSchema);
