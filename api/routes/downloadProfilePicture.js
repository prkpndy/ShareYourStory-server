const express = require("express");
const path = require("path");
const fs = require("fs");

const db = require("../../database");

const router = express.Router();

router.get("/:userId", (req, res, next) => {
    console.log(req.body);

    const userId = req.params.userId;
    db.userDetails.findByPk(userId).then((userDetails) => {
        if (!userDetails) {
            return next(new Error("Image Not Found"));
        }

        const imageExtension = userDetails.profilePictureExtension;

        const imageFileName = "image-" + userId + '.' + imageExtension;
        fs.readFile(userDetails.profilePictureFilePath, (err, data) => {
            if (err) {
                return next(err);
            }
            res.setHeader("Content-Type", "image/" + imageExtension);
            res.setHeader(
                "Content-Disposition",
                'inline; filename="' + imageFileName + '"'
            );
            res.send(data);
        });
    });
});

module.exports = router;
