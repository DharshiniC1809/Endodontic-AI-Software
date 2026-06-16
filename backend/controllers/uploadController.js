const sendToPythonAI =
    require("../services/pythonService");

const uploadScan = async (req, res) => {

    try {

        const {
            mode,
            roiData,
        } = req.body;

        console.log("MODE =", mode);
        console.log("FILES =", req.files);
        console.log("BODY =", req.body);

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

        console.log("REQ BODY =", req.body);
        console.log("REQ FILES =", req.files);

        const aiResponse =
            await sendToPythonAI({

                mode,

                roi: parsedROI,

                xrayImage:
                    xrayImage?.filename,

                cbctImage:
                    cbctImage?.filename,
            });

        console.log("AI RESPONSE =", aiResponse);

        res.status(200).json({

            success: true,

            aiResult: {

                ...aiResponse,

                xrayImage:
                    xrayImage?.filename || null,

                cbctImage:
                    cbctImage?.filename || null,
            }

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