const jwt = require("jsonwebtoken");

const createTokenAndSetCookie = (userId, res) => {
  //Create token
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "15d",
  });

  //Set token into cookie
  res.cookie("jwt", token, {
    maxAge: 15 * 24 * 60 * 60 * 1000, //In ms format
    httpOnly: true, //to prevent XSS attacks cross-site scripting attacks
    sameSite: "strict", // to prevent CSRF attacks
    secure: true,
  });
};

module.exports = { createTokenAndSetCookie };
