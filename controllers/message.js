const Message = require("../schemas/Message");
const Conversation = require("../schemas/Conversation");

//GET MESSAGES
const getMessages = async (req, res) => {
  try {
    const { id: userToChatId } = req.params; //renamed the id after :
    const senderId = req.user._id; //comes from the protectRoute middleware

    const conversation = await Conversation.findOne({
      participants: {
        $all: [senderId, userToChatId],
      },
    }).populate("messages"); //not reference, but actual messages

    if (!conversation) {
      return res.status(200).json([]);
    }

    const messages = conversation.messages;

    res.status(200).json(messages);
  } catch (error) {
    console.error("Error in get messages controller:", error);
    res.status(400).json({ error: error.message });
  }
};

//SEND MESSAGE
const sendMessage = async (req, res) => {
  try {
    const { message } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;

    let conversation = await Conversation.findOne({
      participants: {
        $all: [senderId, receiverId],
      },
    });

    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, receiverId],
      });
    }

    const newMessage = new Message({
      senderId,
      receiverId,
      message,
    });

    if (newMessage) {
      conversation.messages.push(newMessage._id);
    }

    //1 way of saving both in MongoDB
    // await conversation.save();
    // await newMessage.save();

    //Another way, but quicker because both will run in parallel
    await Promise.all([conversation.save(), newMessage.save()]);

    res.status(201).json({ newMessage });
  } catch (error) {
    console.error("Error in send message controller:", error);
    res.status(400).json({ error: error.message });
  }
};

module.exports = { sendMessage, getMessages };
