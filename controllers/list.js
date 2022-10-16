const { Task, ToDoList } = require("../models/ListModel");

const getLists = async (req, res) => {
  const lists = await ToDoList.find({ owner: req.user._id });
  res.json(lists);
};

const addList = async (req, res) => {
  const user = req.user;
  const { name, description } = req.query;

  try {
    const list = await ToDoList.create({
      name: name,
      description: description,
      owner: user._id,
    });

    res.json(list);
  } catch (error) {
    console.log(error);
  }
};

const deleteList = async (req, res) => {
  await Task.deleteMany({ partOf: req.params.todoid });
  await ToDoList.findByIdAndDelete(req.params.todoid);
  res.json({ message: "Deleted succesfully" });
};

const getList = async (req, res) => {
  const tasks = await Task.find({ partOf: req.params.todoid });
  await ToDoList.findByIdAndUpdate(req.params.todoid, {
    tasks: tasks,
  });
  const list = await ToDoList.findById(req.params.todoid);
  res.json(list);
};

const addTask = async (req, res) => {
  const { name, description } = req.query;
  const partOf = req.params.todoid;

  const task = await Task.create({
    name,
    description,
    partOf,
  });

  res.json(task);
};

const deleteTask = async (req, res) => {
  await Task.findByIdAndDelete(req.params.taskid);
  res.json({ message: "task deleted" });
};

const getItems = async (req, res) => {
  const tasks = await Task.find({ owner: req.user._id });
  res.json(tasks);
};

const addItem = async (req, res) => {
  const { name, description, partOf } = req.query;
  const task = await Task.create({
    name,
    description,
    partOf,
    owner: req.user._id,
  });
  res.json(task);
};

module.exports = {
  getLists,
  addList,
  deleteList,
  addTask,
  getList,
  deleteTask,
  getItems,
  addItem,
};
