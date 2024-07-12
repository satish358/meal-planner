const mongoose = require("mongoose");

mongoose.connect(
  process.env.MONGODB_URI ||
    "mongodb+srv://db_user_admin:Zeus8x@cluster0.2fbjpff.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0/k-meal-planner"
);

module.exports = mongoose.connection;
