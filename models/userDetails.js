module.exports = function (sequelize, DataTypes) {
    return sequelize.define(
        "userDetails",
        {
            id: {
                type: DataTypes.STRING(64),
                allowNull: false,
                primaryKey: true,
            },
            name: {
                type: DataTypes.STRING(128),
                allowNull: false,
            },
            occupation: {
                type: DataTypes.STRING(128),
                allowNull: true,
            },
            email: {
                type: DataTypes.STRING(128),
                allowNull: true,
            },
            website: {
                type: DataTypes.STRING(128),
                allowNull: true,
            },
            isProfilePictureAvailable: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
            },
            profilePictureExtension: {
                type: DataTypes.STRING(8),
                allowNull: true,
            },
            profilePictureFilePath: {
                type: DataTypes.STRING(256),
                allowNull: true,
            },
        },
        {
            tableName: "userDetails",
            timestamps: false,
        }
    );
};
