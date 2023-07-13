const bcrypt = require("bcrypt");
const User = require("../models/studentModel");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const response = (req, res) => {
  console.log(req);
  res.send("Done");
};
// signup route handler
const signup = async (req, res) => {
  try {
    //get data
    console.log(req.body);
    const { studentID, name, email, password, phoneNumber } = req.body;
    //check if user already exist
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already Exists",
      });
    }

    //secure password
    let hashedPassword;
    try {
      hashedPassword = await bcrypt.hash(password, 10);
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: "Error inn hashing Password",
        err: err,
      });
    }

    //create entry for User
    const user = await User.create({
      studentID,
      name,
      email,
      password: hashedPassword,
      phoneNumber,
    });

    return res.status(200).json({
      success: true,
      message: "User Created Successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "User cannot be registered, please try again later",
    });
  }
};

//login
const login = async (req, res) => {
  try {
    //data fetch
    console.log(req.body);
    const { email, password } = req.body;
    //validation on email and password
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "PLease fill all the details carefully",
      });
    }

    //check for registered user
    let user = await User.findOne({ email });
    //if not a registered user
    console.log(user);
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User is not registered",
      });
    }

    const payload = {
      email: user.email,
      id: user._id,
      role: user.role,
    };
    //verify password & generate a JWT token
    if (await bcrypt.compare(password, user.password)) {
      //password match
      console.log(process.env.JWT_SECRET);
      let token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "2h",
      });
      console.log(token);
      user = user.toObject();
      user.token = token;
      user.password = undefined;

      const options = {
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      };

      res.cookie("babbarCookie", token, options).status(200).json({
        success: true,
        token,
        user,
        message: "User Logged in successfully",
      });
    } else {
      //passwsord do not match
      return res.status(403).json({
        success: false,
        message: "Password Incorrect",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Login Failure",
    });
  }
};
module.exports = {
  login,
  signup,
  response,
};
