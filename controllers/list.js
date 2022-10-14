const { Task, ToDoList } = require("../models/ListModel");

const getLists = async (req, res) => {
  try {
    const lists = await ToDoList.find({ owner: req.user._id });
    lists.forEach(async (list) => {
      list.items = await Task.find({ partOf: list._id });
      const newL = await list.save();
    });
    res.json(lists);
  } catch (error) {
    console.log(error);
  }
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
  await ToDoList.findByIdAndDelete(req.params.todoid);
  res.json({ message: "Deleted succesfully" });
};

module.exports = { getLists, addList, deleteList };
