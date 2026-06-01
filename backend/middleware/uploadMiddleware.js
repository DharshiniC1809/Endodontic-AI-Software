const multer = require("multer");

const path = require("path");

// STORAGE CONFIG

const storage = multer.diskStorage({

    destination: (req, file, cb) => {

        cb(null, "uploads/");

    },

    filename: (req, file, cb) => {

        const uniqueName =
            Date.now() +
            "-" +
            Math.round(Math.random() * 1E9);

        cb(
            null,
            uniqueName +
            path.extname(file.originalname)
        );

    },

});

// FILE FILTER

const fileFilter = (req, file, cb) => {

    const allowedTypes =
        /jpg|jpeg|png/;

    const extname =
        allowedTypes.test(
            path.extname(file.originalname).toLowerCase()
        );

    const mimetype =
        allowedTypes.test(file.mimetype);

    if (extname && mimetype) {

        return cb(null, true);

    } else {

        cb(
            new Error(
                "Only JPG, JPEG, PNG files allowed"
            )
        );

    }

};

// MULTER CONFIG

const upload = multer({

    storage,

    limits: {
        fileSize: 10 * 1024 * 1024,
    },

    fileFilter,

});

module.exports = upload;