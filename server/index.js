const express = require("express");
const app = express();
const cors = require('cors')

app.use(express.json());
app.use(cors());

const db = require('./models');

// Routers
const usersRouter = require('./routes/Users');
app.use("/auth", usersRouter);

const projectsRouter = require('./routes/Projects');
app.use("/projects", projectsRouter);

const tasksRouter = require('./routes/Tasks');
app.use("/tasks", tasksRouter);


db.sequelize.sync().then(()=> {
    app.listen(process.env.PORT || PORT, () => {
        console.log(`Server is running on port ${PORT}.`);
    });
});

