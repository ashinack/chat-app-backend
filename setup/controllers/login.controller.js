const bcrypt = require("bcrypt");

const login = async (req, res) => {
  const { username, password } = req.body;
  console.log(req.body, "ppp");
  if (username == null || password == null) {
    return res
      .status(400)
      .json({ error: "Username or password cannot be null" });
  }
  try {
    let auth = await req.db.User.findAll({
      where: {
        email: username,
      },
      raw: true,
    });
    const storedHashedPassword = auth[0].password;
    const passwordMatch = await bcrypt.compare(password, storedHashedPassword);
    if (auth.length != 0 && passwordMatch) {
      return res.status(200).json({ message: "Login successful", auth });
    } else {
      // Handle login failure
      return res
        .status(401)
        .json({ message: "Login failed. Invalid credentials." });
    }
  } catch (error) {
    console.log(error, "error");
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { login };
