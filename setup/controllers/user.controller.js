const bcrypt = require("bcrypt");
const saltRounds = 10;
const accessHooks = require("../db.hooks");

const addUser = async (req, res) => {
  const { name, username, password, mobile } = req.body;

  //   const hashedPassword = await hashPassword(password);
  if (username == null || password == null) {
    return res
      .status(400)
      .json({ error: "Username or password cannot be null" });
  }
  try {
    const salt = await bcrypt.genSalt(10);
    let password1 = await bcrypt.hash(password, salt);
    console.log(password1, "password1");
    let data = await req.db.User.create({
      name: name,
      password: password1,
      email: username,
      mobile: mobile,
    });
    data = data.get({ plain: true });
    // accessHooks.accessHooks(req.db, data);
    if (data.length != 0) {
      return res
        .status(200)
        .json({ message: "User created Successfully", data });
    } else {
      // Handle login failure
      return res
        .status(401)
        .json({ message: "user created failed. Invalid credentials." });
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

module.exports = { addUser };
