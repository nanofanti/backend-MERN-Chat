const express = require("express");
const cors = require("cors");
const connectDB = require("./dbinit");
const cookieParser = require("cookie-parser");
require("dotenv").config();

//ROUTES IMPORT
const user = require("./routes/userRoute");
const message = require("./routes/messageRoute");

connectDB();
const { app, httpServer } = require("./socket/socket");

//MIDDLEWARES
app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: "https://nanomernchatapp.netlify.app",
    credentials: true,
  })
);

app.use(express.urlencoded({ extended: true }));

//USER
app.use("/user", user);
app.use("/messages", message);
//MESSAGE

//BASIC ROUTING
app.get("/", (req, res) => {
  res.send("Welcome to the MERNChatAPI");
});
