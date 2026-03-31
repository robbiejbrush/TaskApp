module.exports = (sequelize, DataTypes) => {

    const Users = sequelize.define("Users", {
        userId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },

        email: {
           type: DataTypes.STRING,
           allowNull: false 
        },

        name: {
           type: DataTypes.STRING,
           allowNull: false 
        }
    }, {
        tableName: 'users',
        freezeTableName: true
    });

    Users.associate = (models) => {
        Users.belongsToMany(models.Projects, { 
            through: models.ProjectMembers,
            foreignKey: 'userId', 
            otherKey: 'projectId'
        });
    }

    return Users;
};