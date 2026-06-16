const express =
    require("express");

const {
    saveAnalysis,
    getHistory,
    updateNotes,
    deleteAnalysis
} = require(
    "../controllers/analysisController"
);

const router =
    express.Router();

router.post(
    "/save",
    saveAnalysis
);

router.get(
    "/history/:userId",
    getHistory
);

router.put(
    "/notes/:id",
    updateNotes
);

router.delete(
    "/:id",
    deleteAnalysis
);

module.exports =
    router;