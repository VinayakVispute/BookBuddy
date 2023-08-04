require("dotenv").config();
const jwt = require("jsonwebtoken");
const User = require("../models/studentModel");

module.exports.authMiddleware = (requiredRoles) => {
  return async (req, res, next) => {
    try {
      const token = req?.cookies?.token;

      // Check if token is provided
      if (!token) {
        return res.status(401).json({
          message: "Access Denied. No Token Provided.",
        });
      }

      // Verify token and handle errors
      jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
        if (err) {
          return res.status(401).json({ message: "Invalid Token" });
        }

        // Retrieve user based on decoded token
        const user = await User.findById(decoded.id);
        req.user = user;
        console.log(user)
        const role = user.role;

        // Check if user has the required role
        if (!hasRequiredRole(role, requiredRoles)) {
          return res
            .status(403)
            .json({ message: "Access denied. Insufficient role" });
        }

        // Proceed to the next middleware
        next();
      });
    } catch (error) {
      // Handle server errors
      console.error(error);
      res.status(500).json({ message: "Server Error" });
    }
  };
};

function hasRequiredRole(userRole, requiredRoles) {
  return requiredRoles.includes(userRole);
}