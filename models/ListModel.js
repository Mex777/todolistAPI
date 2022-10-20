const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listSchema = new Schema({
  name: { type: String, required: true },
  description: String,
  owner: { type: mongoose.Types.ObjectId, required: true },
  tasks: [],
});

const itemSchema = new Schema({
  name: { type: String, required: true },
  description: String,
  owner: { type: mongoose.Types.ObjectId, required: true },
  date: Date,
  partOf: mongoose.Types.ObjectId,
});

const ToDoList = mongoose.model("ToDoList", listSchema);
const Task = mongoose.model("Task", itemSchema);

module.exports = { ToDoList, Task };
