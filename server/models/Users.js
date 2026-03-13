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
    });

    Users.associate = (models) => {
        Users.hasMany(models.Tasks, { foreignKey: 'userId' });
        Users.hasMany(models.Projects, { foreignKey: 'userId' });
    }

    return Users;
};