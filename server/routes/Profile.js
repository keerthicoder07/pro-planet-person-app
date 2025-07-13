// server/routes/profile.js
const express = require('express');
const router = express.Router();
const {
  getProfile,
  updateProfile
} = require('../controllers/profile');
const { protect } = require('../middleware/auth');

router.route('/')
  .get(protect, getProfile)
  .put(protect, updateProfile);

module.exports = router;