const express = require('express');
const auth = require('../middleware/auth');
const User = require('../models/User');
const Task = require('../models/Task');
const router = express.Router();

// @desc    Get user profile
// @route   GET /api/profile
// @access  Private
router.get('/', auth(), async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    
    // Get task stats
    const tasksCompleted = await Task.countDocuments({
      'participants.user': req.user.id,
      'participants.status': 'approved'
    });
    
    const tasksHosted = req.user.role === 'organization' 
      ? await Task.countDocuments({ organizer: req.user.id })
      : 0;

    res.json({
      success: true,
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        organization: user.organization,
        points: user.points,
        badges: user.badges,
        carbonReduced: user.carbonReduced,
        createdAt: user.createdAt,
        stats: {
          tasksCompleted,
          tasksHosted
        }
      }
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
});

// @desc    Update user profile
// @route   PUT /api/profile
// @access  Private
router.put('/', auth(), async (req, res) => {
  try {
    // Prevent role changing
    if (req.body.role && req.body.role !== req.user.role) {
      return res.status(400).json({
        success: false,
        error: 'Cannot change user role'
      });
    }

    const user = await User.findByIdAndUpdate(
      req.user.id,
      req.body,
      { new: true, runValidators: true }
    );

    res.json({
      success: true,
      data: {
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

module.exports = router;