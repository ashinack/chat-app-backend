const { use } = require("../routes/user.router");

// Set a cookie
const setCookie = (req, res) => {
  res.cookie("username", "ashina", { maxAge: 900000, httpOnly: true });
  res.send("Cookie set");
};

// Read a cookie
const getCookie = (req, res) => {
  const username = req.cookies.username;
  console.log(username, "pppp");

  res.send(`Username: ${username}`);
};
module.exports = { setCookie, getCookie };
