const bcrypt = require("bcrypt");
const User = require("../models/studentModel");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const cloudinary = require("cloudinary").v2;

const response = (req, res) => {
  console.log(req);
  res.send("Done");
};

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
    const file = req.files.imageUrl;
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

    // Secure password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create entry for User
    const user = await User.create({
      studentID,
      name,
      email,
      password: hashedPassword,
      phoneNumber,
      imageUrl: response.secure_url,
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

function isFileTypeSupported(type, supportedTypes) {
  return supportedTypes.includes(type);
}

async function uploadFileToCloudinary(file, folder, quality) {
  const options = { folder };

  if (quality) {
    options.quality = quality;
  }

  options.resource_type = "auto";
  return await cloudinary.uploader.upload(file.tempFilePath, options);
}

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
