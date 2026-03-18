const express = require('express');
const router = express.Router();
const { Tasks } = require('../models');

router.get("/:projectId", async (req, res) => {
    try {
        const tasks = await Tasks.findAll({
            where: { projectId: req.params.projectId }
        });
        res.json(tasks);
    } catch (error) {
        res.status(500).send(error);
    }
});

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

module.exports = router;