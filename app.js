const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const multer = require("multer");
const { ApolloServer } = require("apollo-server-express");
const fs = require("fs");

const uploadProfilePictureRouter = require("./api/routes/uploadProfilePicture");
const downloadProfilePictureRouter = require("./api/routes/downloadProfilePicture");
const uploadStoryImageRouter = require("./api/routes/uploadStoryImage");
const downloadStoryImageRouter = require("./api/routes/downloadStoryImage");

const typeDefs = require("./schema/schema");
const resolvers = require("./resolvers/resolvers");
const db = require("./database");

const startServer = async () => {
    const app = express();
    const apolloServer = new ApolloServer({
        typeDefs,
        resolvers,
    });
    await apolloServer.start();

    apolloServer.applyMiddleware({ app });

    const fileStorage = multer.diskStorage({
        destination: (req, file, cb) => {
            const reqPath = req.path;
            if (reqPath === "/uploadProfilePicture") {
                cb(null, "uploads/images");
            } else if (reqPath === "/uploadStoryImage") {
                cb(null, "uploads/story");
            }
        },
        filename: async (req, file, cb) => {
            const reqPath = req.path;

            const imageExtension = req.body.imageExtension;
            const fileName = new Date().toISOString() + "-" + file.originalname;

            let oldFilePath;

            if (reqPath === "/uploadProfilePicture") {
                try {
                    const details = await db.userDetails.findByPk(req.body.userId);
                    oldFilePath = details.profilePictureFilePath;
                } catch (err) {
                    console.log(err);
                }

                if (oldFilePath) {
                    fs.unlink(oldFilePath, (err) => {
                        if (err) {
                            console.log(err);
                        } else {
                            console.log("File is deleted.");
                        }
                    });
                }

                try {
                    const result = await db.userDetails.update(
                        {
                            isProfilePictureAvailable: true,
                            profilePictureFilePath: "uploads/images/" + fileName,
                            profilePictureExtension: imageExtension,
                        },
                        { where: { id: req.body.userId } }
                    );
                } catch (err) {
                    console.log(err);
                }
            } else if (reqPath === "/uploadStoryImage") {
                try {
                    const details = await db.userStory.findByPk(req.body.userId);
                    oldFilePath = details.storyFilePath;
                } catch (err) {
                    console.log(err);
                }

                if (oldFilePath) {
                    fs.unlink(oldFilePath, (err) => {
                        if (err) {
                            console.log(err);
                        } else {
                            console.log("File is deleted.");
                        }
                    });
                }

                try {
                    const result = await db.userStory.update(
                        {
                            isStoryAvailable: true,
                            storyFilePath: "uploads/story/" + fileName,
                            storyExtension: imageExtension,
                        },
                        { where: { id: req.body.userId } }
                    );
                } catch (err) {
                    console.log(err);
                }
            }

            cb(null, fileName);
        },
    });

    const fileFilter = (req, file, cb) => {
        if (
            file.mimetype === "image/png" ||
            file.mimetype === "image/jpg" ||
            file.mimetype === "image/jpeg"
        ) {
            cb(null, true);
        } else {
            cb(null, false);
        }
    };

    app.use(morgan("dev"));
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
    app.use(
        multer({ storage: fileStorage, fileFilter: fileFilter }).single("image")
    );

    // Handling the CORS Error
    app.use((req, res, next) => {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "*");

        if (req.method === "OPTIONS") {
            res.header(
                "Access-Control-Allow-Methods",
                "PUT, POST, PATCH, DELETE, GET"
            );
            return res.status(200);
        }
        next();
    });

    app.use("/uploadProfilePicture", uploadProfilePictureRouter);
    app.use("/downloadProfilePicture", downloadProfilePictureRouter);
    app.use("/uploadStoryImage", uploadStoryImageRouter);
    app.use("/downloadStoryImage", downloadStoryImageRouter);

    // If the request does not goes to any of the above routes, than we have to send a error
    app.use((req, res, next) => {
        const error = new Error("Not Found");
        error.status = 404;
        next(error);
    });

    app.use((error, req, res, next) => {
        res.status(error.status || 500).json({
            message: error.message,
        });
    });

    await new Promise((resolve) => app.listen({ port: 5000 }, resolve));
    console.log(`Server ready at http://localhost:5000`);
};

module.exports = startServer;
