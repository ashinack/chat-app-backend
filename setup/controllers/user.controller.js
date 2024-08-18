const bcrypt = require("bcrypt");
const saltRounds = 10;
const accessHooks = require("../db.hooks");
const generateOTP = require("../utils/otp.generator");
const { sendMailToUsers } = require("../utils/nodemailer");

// const isInDevelopment = process.env.NODE_ENV === "development";
const cookieConfigs = {
  httpOnly: true,
  sameSite: false,
  secure: false,
  maxAge: 365 * 24 * 60 * 60 * 1000, // one year
};

const addUser = async (req, res) => {
  const { name, email, password, mobile } = req.body;
  if (email == null || password == null) {
    return res.status(400).json({ error: "email or password cannot be null" });
  }
  try {
    const salt = await bcrypt.genSalt(10);
    let password1 = await bcrypt.hash(password, salt);
    const queries = {
      name: name,
      email: email,
      password: password1,
      mobile: mobile,
    };
    const otp = generateOTP();
    sendMailToUsers(queries, otp);
    res.cookie("otpGenerated", otp, cookieConfigs);
    res.cookie("usert", queries, cookieConfigs);
    res.send({ otp: otp });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const verifyOtp = async (req, res) => {
  const { otp } = req.body;
  const storedOtp = req.cookies.otp1;
  const userDt = req.cookies.usert;
  let otpGenerated = req.cookies.otpGenerated;
  console.log(req.cookies, "otp");

  if (otp == null) {
    return res
      .status(400)
      .json({ error: "Username or password cannot be null" });
  }
  try {
    let data = [];

    // const username = req.cookies.username;
    // console.log(username, "storedOt;name");
    console.log(otpGenerated, "storedOt;");
    console.log(userDt, "storedOt;");
    if (otp == otpGenerated) {
      data = await req.db.User.create(userDt);
      data = data.get({ plain: true });
    }

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

const clearOtp = (req, res) => {
  res.clearCookie("otp1");
  res.clearCookie("username");
  res.clearCookie("otpGenerated");
  res.send("OTP cookie cleared");
};

module.exports = { addUser, verifyOtp, clearOtp };
