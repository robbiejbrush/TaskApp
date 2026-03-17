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
    const { name, userId } = req.body;
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    const length = 8;
    
    let attempts = 0;
    const maxAttempts = 5;
    let newProject = null;

    while (attempts < maxAttempts) {
        // Creating unique identifier for each project
        let code = "";
        for (let i = 0; i < length; i++) {
            code += chars.charAt(Math.floor(Math.random() * chars.length));
        }

        try {
            // Attempt to create the project
            newProject = await Projects.create({ name, code });
            
            // If successful, break the loop
            break; 
        } catch (error) {
            // Check if the error is a unique constraint violation
            if (error.name === 'SequelizeUniqueConstraintError') {
                attempts++;
                console.log(`Code collision detected. Retrying attempt ${attempts}...`);
                if (attempts >= maxAttempts) {
                    return res.status(500).send("Unable to generate a unique project code. Please try again.");
                }
            } else {
                // If it's a different error, don't retry, just throw
                console.error(error);
                return res.status(500).send("Database error occurred");
            }
        }
    }

    // After project is successfully created, create association in junction table
    try {
        const user = await Users.findByPk(userId);
        if (user) {
            await newProject.addUsers(user, { through: { role: 'owner' } });
        }
        res.json(newProject);
    } catch (error) {
        console.error(error);
        res.status(500).send("Project created, but failed to assign owner");
    }
});

router.post("/join", async (req, res) => {
    const { code, userId } = req.body;
    try {
        //Find the project with the matching code
        const project = await Projects.findOne( { where: {code} } );

        if (!project) {
            return res.status(404).json({ message: "Project not found with that code."});
        }

        //Find the user
        const user = await Users.findByPk(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        //Create association in junction table
        await project.addUsers(user, { through: { role: 'member'} });

        res.json({ message: "Successfully joined project."});
    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error while joining project.");
    }
});

module.exports = router;