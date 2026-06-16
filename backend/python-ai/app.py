from flask import Flask, request, jsonify
from skimage.feature import graycomatrix, graycoprops

import joblib
import pandas as pd
import cv2
import os
import numpy as np

app = Flask(__name__)

# LOAD TRAINED MODELS

rfModel = joblib.load(
    "models/random_forest.pkl"
)

svmModel = joblib.load(
    "models/svm_model.pkl"
)

# FOLDERS

UPLOAD_FOLDER = "../uploads"

PROCESSED_FOLDER = "processed"

os.makedirs(PROCESSED_FOLDER, exist_ok=True)


@app.route("/")
def home():

    return jsonify({
        "success": True,
        "message": "Python AI Service Running"
    })


@app.route("/analyze", methods=["POST"])
def analyze():

    try:

        data = request.json

        mode = data.get("mode")

        roi = data.get("roi")

        xrayImage = data.get("xrayImage")

        cbctImage = data.get("cbctImage")

        # IMAGE PATH

        if mode == "xray":

            imagePath = os.path.join(
                UPLOAD_FOLDER,
                xrayImage
            )

        else:

            imagePath = os.path.join(
                UPLOAD_FOLDER,
                cbctImage
            )

        # READ IMAGE

        image = cv2.imread(imagePath)

        print("IMAGE PATH =", imagePath)

        if image is None:
            print("IMAGE NOT FOUND")
        else:
            print("IMAGE SHAPE =", image.shape)

        if image is None:

            return jsonify({
                "success": False,
                "message": "Image not found"
            })

        # ROI VALUES

        x = int(roi["x"])
        y = int(roi["y"])
        width = int(roi["width"])
        height = int(roi["height"])

        if width <= 0 or height <= 0:
            return jsonify({
                "success": False,
                "message": "Invalid ROI"
            })
        
        if width <= 1 or height <= 1:
            imgHeight, imgWidth = image.shape[:2]

            x = 0
            y = 0
            width = imgWidth
            height = imgHeight

        imgHeight, imgWidth = image.shape[:2]

        x = max(0, min(x, imgWidth - 1))
        y = max(0, min(y, imgHeight - 1))

        width = min(width, imgWidth - x)
        height = min(height, imgHeight - y)

        imgHeight, imgWidth = image.shape[:2]

        x = max(0, min(x, imgWidth - 1))
        y = max(0, min(y, imgHeight - 1))

        width = min(width, imgWidth - x)
        height = min(height, imgHeight - y)

        # CROP ROI

        print("AFTER FIX X =", x)
        print("AFTER FIX Y =", y)
        print("AFTER FIX WIDTH =", width)
        print("AFTER FIX HEIGHT =", height)

        croppedROI = image[
            y:y + height,
            x:x + width
        ]

        print("ROI =", roi)

        print("CROPPED SHAPE =", croppedROI.shape)

        if croppedROI.size == 0:
            return jsonify({
                "success": False,
                "message": "ROI EMPTY"
           })

        # RESIZE

        processedROI = cv2.resize(
            croppedROI,
            (256, 256)
        )

        # GRAYSCALE

        grayROI = cv2.cvtColor(
            processedROI,
            cv2.COLOR_BGR2GRAY
        )

        # CLAHE ENHANCEMENT

        clahe = cv2.createCLAHE(
            clipLimit=2.0,
            tileGridSize=(8, 8)
        )

        enhancedROI = clahe.apply(
            grayROI
        )

        # GAUSSIAN BLUR

        blurredROI = cv2.GaussianBlur(
            enhancedROI,
            (5, 5),
            0
        )

        # EDGE DETECTION

        edges = cv2.Canny(
            blurredROI,
            50,
            150
        )

        # FEATURE EXTRACTION

        meanIntensity = np.mean(
            enhancedROI
        )

        edgeDensity = np.sum(
            edges > 0
        ) / (
            edges.shape[0] *
            edges.shape[1]
        )

        glcm = graycomatrix(
            enhancedROI,
            distances=[1],
            angles=[0],
            levels=256,
            symmetric=True,
            normed=True
        )

        contrast = graycoprops(
            glcm,
            'contrast'
        )[0, 0]

        homogeneity = graycoprops(
            glcm,
            'homogeneity'
        )[0, 0]

        energy = graycoprops(
            glcm,
            'energy'
        )[0, 0]

        # PREPARE FEATURE DATA

        featureData = pd.DataFrame([{

            "meanIntensity":
                meanIntensity,

            "edgeDensity":
                edgeDensity,

            "contrast":
                contrast,

            "homogeneity":
                homogeneity,

            "energy":
                energy
        }])

        # RANDOM FOREST PREDICTION

        rfPrediction = rfModel.predict(
            featureData
        )[0]

        # SVM PREDICTION

        svmPrediction = svmModel.predict(
            featureData
        )[0]

        # FINAL ENSEMBLE DECISION

        if rfPrediction == svmPrediction:

            prediction = rfPrediction

        else:

            prediction = rfPrediction

        # CONFIDENCE SCORE

        rfConfidence = max(
            rfModel.predict_proba(
                featureData
            )[0]
        )

        svmConfidence = max(
            svmModel.predict_proba(
                featureData
            )[0]
        )

        confidence = round(
            (
                rfConfidence +
                svmConfidence
            ) / 2 * 100,
            2
        )

        print(featureData)

        print("RF:", rfPrediction)

        print("SVM:", svmPrediction)

        print("Confidence:", confidence)

        # SAVE PROCESSED ROI

        if mode == "xray":

            roiFileName = f"roi_{xrayImage}"

        else:

            roiFileName = f"roi_{cbctImage}"


        roiPath = os.path.join(
            PROCESSED_FOLDER,
            roiFileName
        )

        cv2.imwrite(
            roiPath,
            edges
        )

        return jsonify({

            "success": True,

            "prediction":
                prediction,

            "confidence":
                confidence,

            "mode": mode,

            "roiImage": roiFileName,

            "features": {

                "meanIntensity":
                    float(meanIntensity),

                "edgeDensity":
                    float(edgeDensity),

                "contrast":
                    float(contrast),

                "homogeneity":
                    float(homogeneity),

                "energy":
                    float(energy)
            }

        })

    except Exception as e:

        return jsonify({

            "success": False,

            "message": str(e)

        })


if __name__ == "__main__":

    app.run(debug=True, port=8000)