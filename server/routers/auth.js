const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

// @desc    Register user (customer or organization)
// @route   POST /api/auth/register
// @access  Public
router.post('/register', async (req, res) => {
  try {
    // Prevent admin registration through this route
    if (req.body.role === 'admin') {
      return res.status(400).json({ 
        success: false,
        error: 'Admin registration not allowed through this endpoint'
      });
    }

    const user = await User.create(req.body);
    const token = user.generateAuthToken();

    res.status(201).json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message
    });
  }
});

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email }).select('+password');

    if (!user || !(await user.correctPassword(password, user.password))) {
      return res.status(401).json({
        success: false,
        error: 'Invalid credentials'
      });
    }

    const token = user.generateAuthToken();

    res.json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        organization: user.organization
      }
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message
    });
  }
});

// @desc    Create admin (protected)
// @route   POST /api/auth/admin
// @access  Private/Admin
router.post('/admin', async (req, res) => {
  try {
    // In production, add admin auth middleware here
    const admin = await User.create({
      ...req.body,
      role: 'admin',
      verified: true
    });

    const token = admin.generateAuthToken();

    res.status(201).json({
      success: true,
      token,
      user: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role
      }
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message
    });
  }
});

module.exports = router;