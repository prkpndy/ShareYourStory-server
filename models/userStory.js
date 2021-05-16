module.exports = function (sequelize, DataTypes) {
    return sequelize.define(
        "userStory",
        {
            id: {
                type: DataTypes.STRING(64),
                allowNull: false,
                primaryKey: true,
            },
            isStoryAvailable: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
            },
            storyExtension: {
                type: DataTypes.STRING(8),
                allowNull: true,
            },
            storyFilePath: {
                type: DataTypes.STRING(256),
                allowNull: true,
            },
            storyCaption: {
                type: DataTypes.STRING(1024),
                allowNull: true,
            },
        },
        {
            tableName: "userStory",
            timestamps: false,
        }
    );
};
