const express = require("express");

const router = express.Router();

const upload =
    require("../middleware/uploadMiddleware");

const {
    uploadScan
} = require("../controllers/uploadController");

// SINGLE / MULTIPLE IMAGE UPLOAD

router.post(
    "/",
    upload.fields([
        { name: "xrayImage", maxCount: 1 },
        { name: "cbctImage", maxCount: 1 },
    ]),
    uploadScan
);

module.exports = router;