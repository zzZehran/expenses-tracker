const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Valid email required!"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Valid password required!"],
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
