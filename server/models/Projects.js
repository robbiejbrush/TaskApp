module.exports = (sequelize, DataTypes) => {

    const Projects = sequelize.define("Projects", {
        projectId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },

        userId: {
           type: DataTypes.INTEGER,
           allowNull: false 
        },

        name: {
           type: DataTypes.STRING,
           allowNull: false 
        },

        colour: {
           type: DataTypes.STRING,
           allowNull: false 
        }
    });

    return Projects;
};