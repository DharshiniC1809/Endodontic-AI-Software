const Analysis =
    require("../models/Analysis");

const saveAnalysis =
    async (req, res) => {

        console.log("SAVE API HIT");
        console.log(req.body);


        try {

            const analysis =
                await Analysis.create(
                    req.body
                );

            console.log("SAVED:");
            console.log(analysis);

            res.status(201).json({

                success: true,

                message:
                    "Case saved successfully",

                analysis

            });

        } catch (error) {

            console.log("ERROR OCCURRED:");
            console.log(error);

            res.status(500).json({

                success: false,

                message:
                    error.message

            });

        }
    };

const getHistory =
    async (req, res) => {

        try {

            const analyses =
                await Analysis.find()
                    .sort({
                        createdAt: -1
                    });

            res.status(200).json({

                success: true,

                analyses

            });

        } catch (error) {

            console.log(error);

            res.status(500).json({

                success: false,

                message:
                    "Server Error"

            });

        }

    };

const updateNotes =
    async (req, res) => {

        try {

            const analysis =
                await Analysis.findByIdAndUpdate(

                    req.params.id,

                    {
                        notes:
                            req.body.notes
                    },

                    {
                        new: true
                    }

                );

            res.json({

                success: true,

                analysis

            });

        } catch (error) {

            console.log(error);

            res.status(500).json({

                success: false

            });

        }

    };

const deleteAnalysis = async (req, res) => {

    try {

        await Analysis.findByIdAndDelete(
            req.params.id
        );

        res.json({

            success: true,

            message:
                "Case deleted"

        });

    } catch (error) {

        console.log(error);

        res.status(500).json({

            success: false,

            message:
                "Server Error"

        });

    }

};

module.exports = {
    saveAnalysis,
    getHistory,
    updateNotes,
    deleteAnalysis
};

