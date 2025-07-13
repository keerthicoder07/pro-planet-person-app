const express = require('express');
const router = express.Router();
const {
  getTasks,
  createTask,
  updateTaskStatus,
  participateInTask
} = require('../controllers/tasks');
const { protect } = require('../middleware/auth');

// Base route: /api/tasks

router.route('/')
  .get(getTasks)                // GET /api/tasks
  .post(protect, createTask);   // POST /api/tasks

router.put('/:id/status', protect, updateTaskStatus);      // PUT /api/tasks/:id/status
router.post('/:id/participate', protect, participateInTask); // POST /api/tasks/:id/participate

module.exports = router;