const cloudinary = require("cloudinary").v2;
const {
  isFileTypeSupported,
  uploadFileToCloudinary,
} = require("../utils/cloudinary");
const bcrypt = require("bcrypt");
const User = require("../models/studentModel");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// Signup route handler
const signup = async (req, res) => {
  try {
    // Get data
    const { studentID, name, email, password, phoneNumber } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    // Validate and upload image
    const file = req?.files?.imageUrl;
    if (file) {
      const supportedTypes = ["jpg", "jpeg", "png"];
      const fileType = file.name.split(".")[1].toLowerCase();

      if (!isFileTypeSupported(fileType, supportedTypes)) {
        return res.status(400).json({
          success: false,
          message: "File format not supported",
        });
      }

      console.log("Uploading to Cloudinary");
      const response = await uploadFileToCloudinary(file, "Nishit");
    }
    // Secure password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create entry for User
    const user = await User.create({
      studentID,
      name,
      email,
      password: hashedPassword,
      phoneNumber,
      imageUrl: file ? response.secure_url : null,
    });

    return res.status(200).json({
      success: true,
      message: "User created successfully",
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

    if (!email && !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide your email and password.",
      });
    } else if (!email) {
      return res.status(400).json({
        success: false,
        message: "Please provide your email.",
      });
    } else if (!password) {
      return res.status(400).json({
        success: false,
        message: "Please provide your password.",
      });
    }

    //check for registered user
    let user = await User.findOne({ email });
    //if not a registered user
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User is not Registered",
      });
    }
    console.log("This is user", typeof user);
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
      console.log("This is token", token);
      user = user.toObject();
      user.token = token;
      user.password = undefined;
      console.log("This is user new", typeof user);

      const options = {
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        httpOnly: true,
        withCredentials: true,
      };

      res.cookie("token", token, options).status(200).json({
        httpOnly: true,
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

const logout = (req, res) => {
  try {
    const options = {
      expires: new Date(Date.now() - 1),
      httpOnly: true,
      withCredentials: true,
    };

    res.clearCookie("token", options).status(200).json({
      success: true,
      message: "User logged out successfully",
    });
  } catch (error) {
    console.error("Error logging out:", error);
    res.status(500).json({
      success: false,
      message: "Logout failure",
    });
  }
};

module.exports = {
  signup,
  login,
  logout,
};
