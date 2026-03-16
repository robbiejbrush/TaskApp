module.exports = (sequelize, DataTypes) => {

    const ProjectMembers = sequelize.define("ProjectMembers", {
        memberId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },

        role: {
           type: DataTypes.STRING,
           allowNull: false 
        }
    });

    return ProjectMembers;
};