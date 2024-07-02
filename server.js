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
    origin: "http://localhost:5173",
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

const APP_PORT = process.env.PORT || 8080;

app.listen(APP_PORT, () => {
  console.log(`Server running on http://localhost:${APP_PORT}`);
});
