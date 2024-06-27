const express = require("express");
const cors = require("cors");
const app = express();
const connectDB = require("./dbinit");
require("dotenv").config();
const user = require("./routes/userRoute");
connectDB();
//MIDDLEWARES
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use("/user", user);

//BASIC ROUTING
app.get("/", (req, res) => {
  res.send("Welcome to the MERNChatAPI");
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
