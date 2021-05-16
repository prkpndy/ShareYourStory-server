const express = require("express");

const db = require("../../database");

const router = express.Router();

router.post("/", (req, res, next) => {
    res.status(201).json({
        message: "Story Image Added",
        status: 1,
    });
});

module.exports = router;