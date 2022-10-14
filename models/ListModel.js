const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listSchema = new Schema({
  name: String,
  description: String,
  owner: { type: mongoose.Types.ObjectId, required: true },
  items: [{ type: mongoose.Types.ObjectId, ref: "Task" }],
});

const itemSchema = new Schema({
  name: String,
  description: String,
  partOf: { type: mongoose.Types.ObjectId, ref: "ToDoList", required: true },
});

const ToDoList = mongoose.model("ToDoList", listSchema);
const Task = mongoose.model("Task", itemSchema);

module.exports = { ToDoList, Task };
