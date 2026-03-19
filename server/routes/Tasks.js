const express = require('express');
const router = express.Router();
const { Tasks } = require('../models');

// Get all tasks by projectId
router.get("/:projectId", async (req, res) => {
    try {
        const tasks = await Tasks.findAll({
            where: { projectId: req.params.projectId }
        });
        res.json(tasks);
    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
    }
});

//Create task
router.post("/create", async (req, res) => {
    const taskData = req.body;
    
    try {
        const newTask = await Tasks.create({
            ...taskData,
            completionStatus: false 
    });
        res.json(newTask);

    } catch (error) {
        console.error("Error creating task: ", error);
        res.status(500).json({ error: "Failed to create task." });
    }
});

//Updates task completion status
router.put("/updateStatus/:taskId", async (req, res) => {
  const taskId = req.params.taskId;
  const { completionStatus } = req.body;

  try {
    await Tasks.update(
      { completionStatus: completionStatus }, 
      { where: { taskId: taskId } }
    );
    res.status(200).json("Status updated successfully");
  } catch (error) {
      console.error(error);
      res.status(500).send("Server Error");
  }
});

//Deletes task
router.delete("/:taskId", async (req, res) => {
  const taskId = req.params.taskId;

  try {
    const result = await Tasks.destroy({
      where: { taskId: taskId }
    });

    if (result) {
      res.status(200).json({ message: "Task deleted successfully" });
    } else {
      res.status(404).json({ message: "Task not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

//Edits a task
router.put("/edit/:taskId", async (req, res) => {
  const taskId = req.params.taskId;
  const { title, description, dueDate } = req.body;

  try {
    const [rowsUpdated] = await Tasks.update(
      { 
        title: title, 
        description: description, 
        dueDate: dueDate 
      }, 
      { where: { taskId: taskId } }
    );

    if (rowsUpdated > 0) {
      res.status(200).json({ message: "Task updated successfully" });
    } else {
      res.status(404).json({ message: "Task not found" });
    }
  } catch (err) {
    res.status(500).json({ error: "Error updating task", details: err });
  }
});

module.exports = router;