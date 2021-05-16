const fs = require("fs");

const db = require("../database");

const generateId = () => {
    return `${new Date().getTime()}`;
};

const resolvers = {
    Query: {
        getUserDetails(parent, args) {
            return db.userDetails.findByPk(args.id);
        },
        async getStoryCaption(parent, args) {
            try {
                const details = await db.userStory.findByPk(args.id);
                return details.storyCaption;
            } catch (err) {
                console.log(err);
            }
        },
        hello() {
            return "Hello World";
        },
    },
    Mutation: {
        async addUser(parent, args) {
            const details = {
                id: generateId(),
                name: args.name,
                occupation: args.occupation,
                email: args.email,
                website: args.website,
                isProfilePictureAvailable: false,
            };
            await db.userDetails.create(details);
            return details;
        },
        async removeProfilePicture(parent, args) {
            const details = await db.userDetails.findByPk(args.id);
            const profilePictureFilePath = String(
                details.profilePictureFilePath
            );

            db.userDetails
                .update(
                    {
                        isProfilePictureAvailable: false,
                        profilePictureFilePath: null,
                        profilePictureExtension: null,
                    },
                    { where: { id: args.id } }
                )
                .then((result) => {
                    fs.unlink(profilePictureFilePath, (err) => {
                        if (err) {
                            console.log(err);
                        } else {
                            console.log("File is deleted.");
                        }
                    });
                })
                .catch((err) => console.log(err));
        },
        async addStoryCaption(parent, args) {
            console.log("in addStoryCaption, args = ", args);
            try {
                await db.userStory.update(
                    {
                        storyCaption: args.caption,
                    },
                    { where: { id: args.id } }
                );
            } catch (err) {
                console.log(err);
            }
        },
    },
};

module.exports = resolvers;
