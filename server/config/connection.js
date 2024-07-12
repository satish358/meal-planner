const mongoose = require("mongoose");

mongoose.connect(
  process.env.MONGODB_URI ||
    "mongodb+srv://satish4x:Naisangatja@cluster0.auwbtad.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0/k-meal-planner"
);

module.exports = mongoose.connection;
