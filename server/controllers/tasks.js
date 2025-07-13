const Task = require('../models/Task');
const ErrorResponse = require('../utils/errorResponse');

// Get all tasks
exports.getTasks = async (req, res, next) => {
  try {
    const tasks = await Task.find();
    res.status(200).json({ success: true, data: tasks });
  } catch (err) {
    next(err);
  }
};

// Create new task
exports.createTask = async (req, res, next) => {
  try {
    const task = await Task.create(req.body);
    res.status(201).json({ success: true, data: task });
  } catch (err) {
    next(err);
  }
};

// Update task status
exports.updateTaskStatus = async (req, res, next) => {
  try {
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true, runValidators: true }
    );
    
    if (!task) {
      return next(new ErrorResponse(`Task not found with id ${req.params.id}`, 404));
    }
    
    res.status(200).json({ success: true, data: task });
  } catch (err) {
    next(err);
  }
};

// Participate in task
exports.participateInTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);
    
    if (!task) {
      return next(new ErrorResponse(`Task not found with id ${req.params.id}`, 404));
    }
    
    // Add user to participants
    task.participants.push({
      user: req.user.id,
      status: 'pending'
    });
    
    await task.save();
    res.status(200).json({ success: true, data: task });
  } catch (err) {
    next(err);
  }
};