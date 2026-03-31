module.exports = (sequelize, DataTypes) => {

    const Tasks = sequelize.define("Tasks", {
        taskId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },

        title: {
           type: DataTypes.STRING,
           allowNull: false 
        },

        description: {
           type: DataTypes.STRING,
           allowNull: false 
        },

        completionStatus: {
           type: DataTypes.BOOLEAN,
           allowNull: false 
        },

        dueDate: {
           type: DataTypes.DATEONLY,
           allowNull: false 
        }
    }, {
        tableName: 'tasks',
        freezeTableName: true
    });

    Tasks.associate = (models) => {
      Tasks.belongsTo(models.Projects, { 
        foreignKey: 'projectId' 
    });
}

    return Tasks;
};