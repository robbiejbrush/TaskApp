const express = require('express');
const router = express.Router();
const { Projects, Users, ProjectMembers } = require('../models');

//Gets all projects for a userId
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

//Creates new project
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

//Creates new association for a user joining a project
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

//Gets all user names and roles for a projectId
router.get("/:projectId/users", async (req, res) => {
    try {
        const projectId = req.params.projectId;
        
        const projectWithUsers = await Projects.findByPk(projectId, {
            include: [{
                model: Users,
                attributes: ['userId', 'name'], 
                through: { attributes: ["role"] } 
            }]
        });

        if (!projectWithUsers) {
            return res.status(404).json({ message: "Project not found" });
        }

        res.json(projectWithUsers.Users); 
    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
    }
});

//Deletes project by owner
router.delete("/:projectId", async (req, res) => {
    const { projectId } = req.params;
    try {
        const deleted = await Projects.destroy({
            where: { projectId: projectId } 
        });

        if (deleted) {
            res.json({ message: "Project deleted successfully." });
        } else {
            res.status(404).json({ error: "Project not found." });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error.");
    }
});

//Remove a user from a project (leave)
router.delete("/:projectId/leave/:userId", async (req, res) => {
    const { projectId, userId } = req.params;
    try {
        const removed = await ProjectMembers.destroy({
            where: {
                projectId: projectId,
                userId: userId
            }
        });

        if (removed) {
            res.json({ message: "You have left the project." });
        } else {
            res.status(404).json({ error: "Association not found." });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error.");
    }
});

module.exports = router;