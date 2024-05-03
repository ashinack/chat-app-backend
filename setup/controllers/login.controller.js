const bcrypt = require("bcrypt");
const { where } = require("sequelize");
const saltRounds = 10;
const password = "Admin@123";

bcrypt
  .genSalt(saltRounds)
  .then(async (salt) => {
    console.log("Salt: ", salt);

    let password1 = await bcrypt.hash(password, salt);
    console.log("password", password1);
    return bcrypt.hash(password, salt);
  })
  .then((hash) => {
    console.log("Hash: ", hash);
  })
  .catch((err) => console.error(err.message));

const login = (req, res) => {
  const { username, password } = req.body;
  if (username == null || password == null) {
    return res
      .status(400)
      .json({ error: "Username or password cannot be null" });
  }
  try {
    let auth = db.User.findAll({
      where: {
        password: password,
        username: username,
      },
      raw: true,
    });
    if (auth != null) {
      return res.status(200).json({ message: "Login successful", auth });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
