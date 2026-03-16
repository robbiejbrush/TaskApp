const express = require('express');
const router = express.Router();
const { Projects, Users } = require('../models');

router.get("/:userId", async (req, res) => {
    try {
        const userId = req.params.userId;
        
        const userWithProjects = await Users.findByPk(userId, {
            include: [{
                model: Projects,
                through: { attributes: [] }
            }]
        });

        res.json(userWithProjects ? userWithProjects.Projects : []);
    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
    }
});

router.post("/create", async (req, res) => {
    try {
        const { name, userId } = req.body;

        const newProject = await Projects.create({ name });

        const user = await Users.findByPk(userId);
        if (user) {
            await newProject.addUsers(user, { through: { role: 'owner' } });
        }

        res.json(newProject);
    } catch (error) {
        console.error(error);
        res.status(500).send("Could not create project");
    }
});


module.exports = router;