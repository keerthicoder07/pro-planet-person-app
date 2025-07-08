const express = require('express');
const auth = require('../middleware/auth');
const Task = require('../models/Task');
const User = require('../models/User');
const router = express.Router();

// @desc    Create a task
// @route   POST /api/tasks
// @access  Private (Organization/Admin)
router.post('/', auth(['organization', 'admin']), async (req, res) => {
  try {
    const task = await Task.create({
      ...req.body,
      organizer: req.user.id
    });

    res.status(201).json({
      success: true,
      data: task
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message
    });
  }
});

// @desc    Get all tasks
// @route   GET /api/tasks
// @access  Public
router.get('/', async (req, res) => {
  try {
    const tasks = await Task.find()
      .populate('organizer', 'name email')
      .sort('-createdAt');

    res.json({
      success: true,
      count: tasks.length,
      data: tasks
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
});

// @desc    Participate in task
// @route   POST /api/tasks/:id/participate
// @access  Private (Customer)
router.post('/:id/participate', auth(['customer']), async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({
        success: false,
        error: 'Task not found'
      });
    }

    // Check if already participating
    const isParticipating = task.participants.some(
      p => p.user.toString() === req.user.id
    );

    if (isParticipating) {
      return res.status(400).json({
        success: false,
        error: 'Already participating in this task'
      });
    }

    task.participants.push({ user: req.user.id });
    await task.save();

    res.json({
      success: true,
      data: task
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
});

// @desc    Submit proof for task
// @route   PUT /api/tasks/:id/proof
// @access  Private (Customer)
router.put('/:id/proof', auth(['customer']), async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({
        success: false,
        error: 'Task not found'
      });
    }

    const participant = task.participants.find(
      p => p.user.toString() === req.user.id
    );

    if (!participant) {
      return res.status(403).json({
        success: false,
        error: 'Not participating in this task'
      });
    }

    participant.proof = req.body.proofUrl;
    await task.save();

    // TODO: Send notification to organizer

    res.json({
      success: true,
      data: task
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
});

// @desc    Verify task completion
// @route   PUT /api/tasks/:id/verify
// @access  Private (Organization/Admin)
router.put('/:id/verify', auth(['organization', 'admin']), async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({
        success: false,
        error: 'Task not found'
      });
    }

    // Check if user is organizer or admin
    if (task.organizer.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        error: 'Not authorized to verify this task'
      });
    }

    const participant = task.participants.id(req.body.participantId);

    if (!participant) {
      return res.status(404).json({
        success: false,
        error: 'Participant not found'
      });
    }

    participant.status = req.body.status;

    // If approved, award points
    if (req.body.status === 'approved') {
      const user = await User.findById(participant.user);
      user.points += task.points;
      user.carbonReduced += req.body.carbonReduced || 5; // Default 5kg if not provided
      await user.save();
    }

    await task.save();

    res.json({
      success: true,
      data: task
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
});

module.exports = router;