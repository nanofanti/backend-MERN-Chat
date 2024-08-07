const express = require("express");
const cors = require("cors");
const connectDB = require("./dbinit");
const cookieParser = require("cookie-parser");
require("dotenv").config();

//ROUTES IMPORT
const user = require("./routes/userRoute");
const message = require("./routes/messageRoute");

const { app, httpServer } = require("./socket/socket");

//MIDDLEWARES
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST"], // Allow the methods used by your API
    credentials: true, // Allow credentials (cookies)
  })
);
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(cookieParser());

app.use(express.urlencoded({ extended: true }));

//USER
app.use("/user", user);
app.use("/messages", message);
//MESSAGE

//BASIC ROUTING
app.get("/", (req, res) => {
  res.send("Welcome to the MERNChatAPI");
});

httpServer.listen(PORT, () => {
  connectDB();
  console.log(`Server and Socket running on http://localhost:${PORT}`);
});
