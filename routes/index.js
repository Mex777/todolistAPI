const express = require("express");
const listController = require("../controllers/list");
const router = express.Router();

router.get("/", (req, res) => {
  res.json({
    message: "LOGGED",
    user: req.user,
  });
});

router.get("/todo", listController.getLists);
router.post("/todo", listController.addList);

router.get("/todo/:todoid", listController.getList);
router.delete("/todo/:todoid", listController.deleteList);
router.post("/todo/:todoid", listController.addTask);

router.delete("/todo/:todoid/:taskid", listController.deleteTask);

module.exports = router;
