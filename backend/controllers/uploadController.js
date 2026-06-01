const sendToPythonAI =
    require("../services/pythonService");

const uploadScan = async (req, res) => {

    try {

        const {
            mode,
            roiData,
        } = req.body;

        const parsedROI =
            roiData
                ? JSON.parse(roiData)
                : null;

        const xrayImage =
            req.files?.xrayImage?.[0];

        const cbctImage =
            req.files?.cbctImage?.[0];

        // VALIDATION

        if (
            mode === "xray" &&
            !xrayImage
        ) {

            return res.status(400).json({

                success: false,

                message:
                    "X-ray image required",

            });

        }

        if (
            mode === "cbct" &&
            !cbctImage
        ) {

            return res.status(400).json({

                success: false,

                message:
                    "CBCT image required",

            });

        }


        // SEND TO PYTHON

        const aiResponse =
            await sendToPythonAI({

                mode,

                roi: parsedROI,

                xrayImage:
                    xrayImage?.filename,

                cbctImage:
                    cbctImage?.filename,
            });

        res.status(200).json({

            success: true,

            aiResult: aiResponse,

        });

    } catch (error) {

        console.log(error);

        res.status(500).json({

            success: false,

            message: "Server Error",

        });

    }

};

module.exports = {
    uploadScan,
};