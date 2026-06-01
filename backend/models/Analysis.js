const mongoose = require("mongoose");

const analysisSchema =
    new mongoose.Schema({

        userId: {
            type: String,
            required: true
        },

        patientName: {
            type: String,
            required: true
        },

        patientAge: {
            type: String
        },

        mode: {
            type: String,
            required: true
        },

        prediction: String,

        confidence: Number,

        meanIntensity: Number,

        edgeDensity: Number,

        contrast: Number,

        homogeneity: Number,

        energy: Number,

        notes: String,

        xrayImage: String,

        cbctImage: String

    }, {
        timestamps: true
    });

module.exports =
    mongoose.model(
        "Analysis",
        analysisSchema
    );