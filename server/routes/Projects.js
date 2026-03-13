const express = require('express');
const router = express.Router();
const { Projects } = require('../models');

router.get("/:userId", async (req, res) => {
    const userId = req.params.userId;
    const projects = await Projects.findAll( {where: {userId: userId}} );
    res.json(projects);
});

router.post("/", async (req, res) => {
    const project = req.body

    await Projects.create(project);
    res.json(project);
});


module.exports = router;