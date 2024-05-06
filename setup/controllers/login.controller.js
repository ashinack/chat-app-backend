const bcrypt = require("bcrypt");
const { where } = require("sequelize");
const { log } = require("winston");
const db = require("../db");
const { password } = require("../db.config");
const saltRounds = 10;

const login = async (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = await hashPassword(password);
  if (username == null || password == null) {
    return res
      .status(400)
      .json({ error: "Username or password cannot be null" });
  }
  try {
    let auth = await db.User.findAll({
      where: {
        password: password,
        email: username,
      },
      raw: true,
    });
    console.log(auth.length, "auth");
    if (auth.length != 0) {
      return res.status(200).json({ message: "Login successful", auth });
    } else {
      // Handle login failure
      return res
        .status(401)
        .json({ message: "Login failed. Invalid credentials." });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

async function hashPassword(password) {
  try {
    // Generate salt and hash password
    const hash = await bcrypt.hash(password, saltRounds);
    return hash;
  } catch (error) {
    throw error;
  }
}

module.exports = { login };
