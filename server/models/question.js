var mongoose = require('mongoose');

var Question = mongoose.model('Question', {
  question: {
    type: String,
    required: true,
    minLength: 1,
    trim: true
  },
  answer: {
    type: String,
    required: true,
    minLength: 1,
    trim: true
  },
  wrongAnswer: {
    type: String,
    required: true,
    minLength: 1,
    trim: true
  },
  category: {
    type: String,
    required: true,
    minLength: 1,
    trim: true
  }
});

module.exports = { Question };

