const mongoose = require("mongoose");

const QuerySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true
  },
  phone: {
    type: String,
    required: true,
    trim: true
  },
  message: {
    type: String,
    required: true,
    maxlength: 1000
  },
  submittedAt: {
    type: Date,
    default: Date.now
  }
}, {
  collection: "Queries"
});

module.exports = mongoose.model("Query", QuerySchema);