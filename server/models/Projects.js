module.exports = (sequelize, DataTypes) => {

    const Projects = sequelize.define("Projects", {
        projectId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },

        name: {
           type: DataTypes.STRING,
           allowNull: false 
        }
    });

    Projects.associate = (models) => {
        Projects.hasMany(models.Tasks, { 
            foreignKey: 'projectId',
            onDelete: 'CASCADE' 
        });
        Projects.belongsToMany(models.Users, {
            through: models.ProjectMembers,
            foreignKey: 'projectId',
            otherKey: 'userId',
            onDelete: 'CASCADE'
        });
    }

    return Projects;
};