const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB =
    require("./config/db");

const app = express();

connectDB();

const PORT = process.env.PORT || 5000;

// MIDDLEWARE

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

// TEST ROUTE

app.get("/", (req, res) => {

    res.json({
        success: true,
        message: "Endodontic AI Backend Running"
    });

});

// ROUTES

const uploadRoutes =
    require("./routes/uploadRoutes");

const authRoutes =
    require("./routes/authRoutes");

const analysisRoutes =
    require("./routes/analysisRoutes");

app.use(
    "/api/upload",
    uploadRoutes
);

app.use(
    "/api/analysis",
    analysisRoutes
);


app.use(
    "/api/auth",
    authRoutes
);

const path = require("path");

app.use(
    "/uploads",
    express.static(
        path.join(__dirname, "uploads")
    )
);

// START SERVER

app.listen(PORT, () => {

    console.log(
        `Server running on port ${PORT}`
    );

}); 