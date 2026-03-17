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

module.exports = router;