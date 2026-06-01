const axios = require("axios");

const sendToPythonAI = async ({
    mode,
    roi,
    xrayImage,
    cbctImage
}) => {

    try {

        console.log({
            mode,
            roi,
            xrayImage,
            cbctImage
        });

        const response =
            await axios.post(
                "http://127.0.0.1:8000/analyze",
                {
                    mode,
                    roi,
                    xrayImage,
                    cbctImage,
                }
            );

        return response.data;

    } catch (error) {

        console.log(
            "Python Service Error:",
            error.message
        );

        throw error;
    }

};

module.exports = sendToPythonAI;