// server/models/Task.js
const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a task title'],
    trim: true,
    maxlength: 100
  },
  description: {
    type: String,
    required: [true, 'Please provide a description']
  },
  points: {
    type: Number,
    required: true,
    min: [10, 'Minimum 10 points per task'],
    max: [100, 'Maximum 100 points per task']
  },
  location: {
    type: {
      type: String,
      default: 'Point',
      enum: ['Point']
    },
    coordinates: {
      type: [Number],
      required: true,
      validate: {
        validator: function(v) {
          return v.length === 2 && 
                 v[0] >= -180 && v[0] <= 180 && 
                 v[1] >= -90 && v[1] <= 90;
        },
        message: props => `${props.value} is not a valid coordinate!`
      }
    },
    address: String
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: Date,
  organizer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  participants: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    proof: String, // URL to image
    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected'],
      default: 'pending'
    },
    submittedAt: {
      type: Date,
      default: Date.now
    }
  }],
  status: {
    type: String,
    enum: ['pending', 'active', 'completed', 'cancelled'],
    default: 'pending'
  },
  verificationRequired: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Index for geospatial queries
taskSchema.index({ location: '2dsphere' });

// Virtual for duration (not stored in DB)
taskSchema.virtual('durationDays').get(function() {
  if (!this.endDate) return null;
  return Math.ceil((this.endDate - this.startDate) / (1000 * 60 * 60 * 24));
});

// Cascade delete participations when task is deleted
taskSchema.pre('remove', async function(next) {
  await this.model('Participation').deleteMany({ task: this._id });
  next();
});

module.exports = mongoose.model('Task', taskSchema);