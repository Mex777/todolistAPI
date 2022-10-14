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

router.delete("/todo/:todoid", listController.deleteList);

module.exports = router;
