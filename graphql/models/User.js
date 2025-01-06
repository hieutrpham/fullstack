const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  favoriteGenre: [
    {
      type: String,
    },
  ],
});

module.exports = mongoose.model("User", userSchema);
