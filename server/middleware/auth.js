const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Role-based authentication middleware
exports.auth = (roles = []) => {
  return async (req, res, next) => {
    let token;

    // Check for token in headers
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return res.status(401).json({
        success: false,
        error: 'Not authorized to access this route'
      });
    }

    try {
      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Check if user still exists
      const user = await User.findById(decoded.id);

      if (!user) {
        return res.status(401).json({
          success: false,
          error: 'User not found'
        });
      }

      // Check if user role is allowed
      if (roles.length && !roles.includes(user.role)) {
        return res.status(403).json({
          success: false,
          error: 'Not authorized to access this route'
        });
      }

      // Grant access
      req.user = user;
      next();
    } catch (err) {
      return res.status(401).json({
        success: false,
        error: 'Not authorized to access this route'
      });
    }
  };
};