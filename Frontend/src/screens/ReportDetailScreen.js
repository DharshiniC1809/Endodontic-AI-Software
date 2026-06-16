import React, {
    useState,
} from "react";

import * as Sharing from "expo-sharing";
import * as Print from "expo-print";
import { Platform } from "react-native";

import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    Modal,
    Image,
} from "react-native";

import {
    Ionicons,
} from "@expo/vector-icons";

import {
    LinearGradient,
} from "expo-linear-gradient";

export default function ReportDetailScreen({
    navigation,
    route,
}) {

    const {
        report,
    } = route.params;

    const [downloadModal, setDownloadModal] =
        useState(false);

    // RESULT COLORS

    const getResultData = () => {

        if (report.prediction === "HIGH") {

            return {
                colors: [
                    "#22C55E",
                    "#16A34A"
                ],
                label:
                    "HIGH SUCCESS",
            };
        }

        if (report.prediction === "MODERATE") {

            return {
                colors: [
                    "#F59E0B",
                    "#D97706"
                ],
                label:
                    "MODERATE SUCCESS",
            };
        }

        return {
            colors: [
                "#EF4444",
                "#DC2626"
            ],
            label:
                "LOW SUCCESS",
        };
    };

    const result =
        getResultData();

    const downloadPDF = async () => {

        console.log("DOWNLOAD BUTTON CLICKED");

        const html = `
<html>

<head>

<style>

*{
    -webkit-print-color-adjust: exact !important;
    print-color-adjust: exact !important;
}

body{
    font-family: Arial;
    background:#F8FAFC;
    padding:20px;
    color:#0F172A;
}

.header{
    background:#2563EB;
    color:white;
    text-align:center;
    padding:25px;
    border-radius:12px;
}

.section{
    background:white;
    margin-top:15px;
    padding:18px;
    border-radius:12px;
    border:1px solid #E2E8F0;
}

table{
    width:100%;
    border-collapse:collapse;
}

td{
    padding:10px;
    border-bottom:1px solid #E2E8F0;
}

.prediction{
    text-align:center;
    padding:20px;
    border-radius:12px;
    font-size:24px;
    font-weight:bold;
    margin-top:10px;
    background:${report.prediction === "HIGH"
                ? "#DCFCE7"
                : report.prediction === "LOW"
                    ? "#FEE2E2"
                    : "#FEF3C7"
            };
    color:${report.prediction === "HIGH"
                ? "#166534"
                : report.prediction === "LOW"
                    ? "#991B1B"
                    : "#92400E"
            };
}

.bar{
    width:100%;
    height:18px;
    background:#E5E7EB;
    border-radius:20px;
    margin-top:10px;
}

.fill{
    height:100%;
    background:#2563EB;
    border-radius:20px;
    width:${report.confidence || 0}%;
}

.footer{
    margin-top:25px;
    text-align:center;
    font-size:12px;
    color:#64748B;
}

</style>

</head>

<body>

<div class="header">
    <h1>EndoAI</h1>
    <h3>AI-Powered Endodontic Prediction Report</h3>
</div>

<div class="section">

    <h2>Patient Information</h2>

    <table>

        <tr>
            <td><b>Patient Name</b></td>
            <td>${report.patientName || "Unknown Patient"}</td>
        </tr>

        <tr>
            <td><b>Age</b></td>
            <td>${report.patientAge || "N/A"}</td>
        </tr>

        <tr>
            <td><b>Analysis Mode</b></td>
            <td>${report.mode || "N/A"}</td>
        </tr>

        <tr>
            <td><b>Date</b></td>
            <td>${new Date(report.createdAt).toLocaleDateString()}</td>
        </tr>

    </table>

</div>

<div class="section">

    <h2>Prediction Result</h2>

    <div class="prediction">
        ${report.prediction}
    </div>

    <p>
        <b>Confidence:</b>
        ${report.confidence?.toFixed(2) || "0"}%
    </p>

    <div class="bar">
        <div class="fill"></div>
    </div>

</div>

<div class="section">

    <h2>Measurements</h2>

    <p><b>Mean Intensity:</b>
    ${report.meanIntensity ?? "N/A"}</p>

    <p><b>Edge Density:</b>
    ${report.edgeDensity ?? "N/A"}</p>

    <p><b>Contrast:</b>
    ${report.contrast ?? "N/A"}</p>

    <p><b>Homogeneity:</b>
    ${report.homogeneity ?? "N/A"}</p>

    <p><b>Energy:</b>
    ${report.energy ?? "N/A"}</p>

</div>

<div class="section">

    <h2>Clinical Notes</h2>

    <p>
        ${report.notes || "No notes available"}
    </p>

</div>

<div class="section">

    <h2>AI Recommendation</h2>

    <p>
        ${report.prediction === "HIGH"
                ? "High probability of successful treatment. Proceed with standard clinical protocol."
                : report.prediction === "LOW"
                    ? "Further examination and specialist review recommended."
                    : "Moderate success probability. Clinical judgement advised."
            }
    </p>

</div>

<div class="section">

    <h2>Diagnostic Image</h2>

    <img
        src="${report.mode === "xray"
                ? `http://10.179.115.44:5000/uploads/${report.xrayImage}`
                : `http://10.179.115.44:5000/uploads/${report.cbctImage}`
            }"
        style="
    width:70%;
    max-height:250px;
    object-fit:contain;
    display:block;
    margin:auto;
    border:1px solid #E2E8F0;
    border-radius:12px;
"
    />

</div>

<div class="footer">

    <hr>

    <p>
        Generated by EndoAI Clinical Decision Support System
    </p>

    <p>
        This report is intended for clinical assistance only.
    </p>

</div>

</body>

</html>
`;

        if (Platform.OS === "web") {

            const printWindow = window.open("", "_blank");
            printWindow.document.write(html);
            printWindow.document.close();
            printWindow.print();

            return;
        }

        const file =
            await Print.printToFileAsync({
                html
            });

        console.log("PDF =", file);

        await Sharing.shareAsync(
            file.uri
        );
    };

    return (

        <View style={styles.container}>

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                    paddingBottom: 120,
                }}
            >

                {/* BACK */}

                <TouchableOpacity
                    style={styles.backRow}
                    onPress={() =>
                        navigation.goBack()
                    }
                >

                    <Ionicons
                        name="arrow-back"
                        size={20}
                        color="#2563EB"
                    />

                    <Text style={styles.backText}>
                        Back
                    </Text>

                </TouchableOpacity>

                {/* TITLE */}

                <Text style={styles.screenTitle}>
                    Report
                </Text>

                {/* PATIENT CARD */}

                <View style={styles.patientCard}>

                    <Text style={styles.patientName}>
                        {report.patientName}
                    </Text>

                    <Text style={styles.caseInfo}>
                        {
                            new Date(report.createdAt)
                                .toLocaleDateString()
                        }
                    </Text>

                    <Text style={styles.modeText}>
                        {report.mode || "N/A"} Analysis
                    </Text>

                </View>

                {/* RESULT */}

                <LinearGradient
                    colors={result.colors}
                    style={styles.resultCard}
                >

                    <Text style={styles.resultLabel}>
                        Prediction
                    </Text>

                    <Text style={styles.resultText}>
                        {report.prediction}
                    </Text>

                    <Text style={styles.confidenceText}>
                        AI Confidence: {
                            report.confidence != null
                                ? report.confidence.toFixed(2)
                                : "N/A"
                        }%
                    </Text>

                </LinearGradient>

                {/* MEASUREMENTS */}

                <View style={styles.measurementCard}>

                    <View style={styles.measurementRow}>
                        <Text style={styles.measurementLabel}>
                            Mean Intensity
                        </Text>
                        <Text style={styles.measurementValue}>
                            {report.meanIntensity != null
                                ? report.meanIntensity.toFixed(2)
                                : "N/A"}
                        </Text>
                    </View>

                    <View style={styles.divider} />

                    <View style={styles.measurementRow}>
                        <Text style={styles.measurementLabel}>
                            Edge Density
                        </Text>
                        <Text style={styles.measurementValue}>
                            {report.edgeDensity != null
                                ? report.edgeDensity.toFixed(4)
                                : "N/A"}
                        </Text>
                    </View>

                    <View style={styles.divider} />

                    <View style={styles.measurementRow}>
                        <Text style={styles.measurementLabel}>
                            Contrast
                        </Text>
                        <Text style={styles.measurementValue}>
                            {report.contrast != null
                                ? report.contrast.toFixed(2)
                                : "N/A"}
                        </Text>
                    </View>

                    <View style={styles.divider} />

                    <View style={styles.measurementRow}>
                        <Text style={styles.measurementLabel}>
                            Homogeneity
                        </Text>
                        <Text style={styles.measurementValue}>
                            {report.homogeneity != null
                                ? report.homogeneity.toFixed(2)
                                : "N/A"}
                        </Text>
                    </View>

                    <View style={styles.divider} />

                    <View style={styles.measurementRow}>
                        <Text style={styles.measurementLabel}>
                            Energy
                        </Text>
                        <Text style={styles.measurementValue}>
                            {report.energy != null
                                ? report.energy.toFixed(2)
                                : "N/A"}
                        </Text>
                    </View>

                </View>

                {/* RECOMMENDATION */}

                <LinearGradient
                    colors={[
                        "#DBEAFE",
                        "#E0F2FE"
                    ]}
                    style={styles.recommendationCard}
                >

                    <Text style={styles.recommendationTitle}>
                        Recommendation
                    </Text>

                    <Text style={styles.recommendationText}>
                        {
                            report.prediction === "HIGH"
                                ? "High probability of successful treatment."
                                : report.prediction === "LOW"
                                    ? "Further examination recommended."
                                    : "Clinical review recommended."
                        }
                    </Text>

                </LinearGradient>

                {/* X-RAY SCAN */}

                {
                    report.mode === "xray" ||
                        report.mode === "Combined"
                        ? (

                            <View style={styles.scanCard}>

                                <Text style={styles.scanTitle}>
                                    X-ray Scan
                                </Text>

                                <Image
                                    source={{
                                        uri:
                                            `http://10.179.115.44:5000/uploads/${report.xrayImage}`
                                    }}
                                    style={styles.scanImage}
                                />

                            </View>

                        ) : null
                }

                {/* CBCT SCAN */}

                {
                    report.mode === "cbct" ||
                        report.mode === "Combined"
                        ? (

                            <View style={styles.scanCard}>

                                <Text style={styles.scanTitle}>
                                    CBCT Scan
                                </Text>

                                <Image
                                    source={{
                                        uri:
                                            `http://10.179.115.44:5000/uploads/${report.cbctImage}`
                                    }}
                                    style={styles.scanImage}
                                />

                            </View>

                        ) : null
                }

                {/* NOTES */}

                <View style={styles.notesCard}>

                    <Text style={styles.notesTitle}>
                        Notes
                    </Text>

                    <Text style={styles.notesText}>
                        {report.notes || "No notes available"}
                    </Text>

                </View>

                {/* DOWNLOAD BUTTON */}

                <TouchableOpacity
                    activeOpacity={0.85}
                    onPress={downloadPDF}
                >

                    <LinearGradient
                        colors={[
                            "#3B82F6",
                            "#2563EB",
                            "#1D4ED8"
                        ]}
                        style={styles.downloadButton}
                    >

                        <Ionicons
                            name="download"
                            size={18}
                            color="#FFFFFF"
                        />

                        <Text style={styles.downloadText}>
                            Download Report
                        </Text>

                    </LinearGradient>

                </TouchableOpacity>

            </ScrollView>

            {/* DOWNLOAD POPUP */}

            <Modal
                transparent={true}
                visible={downloadModal}
                animationType="fade"
            >

                <View style={styles.modalOverlay}>

                    <View style={styles.modalContainer}>

                        <View style={styles.successCircle}>

                            <Ionicons
                                name="checkmark"
                                size={28}
                                color="#FFFFFF"
                            />

                        </View>

                        <Text style={styles.modalTitle}>
                            Report Downloaded
                        </Text>

                        <Text style={styles.modalText}>
                            File saved to your device
                        </Text>

                        <TouchableOpacity
                            style={styles.okButton}
                            onPress={() => {

                                setDownloadModal(false);

                                navigation.reset({
                                    index: 1,
                                    routes: [
                                        {
                                            name: "Home",
                                        },
                                        {
                                            name: "Reports",
                                        },
                                    ],
                                });
                            }}
                        >

                            <Text style={styles.okText}>
                                OK
                            </Text>

                        </TouchableOpacity>

                    </View>

                </View>

            </Modal>

        </View>

    );
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: "#F8FAFC",
        paddingHorizontal: 22,
        paddingTop: 65,

        ...(Platform.OS === "web" && {
            width: 544,
            alignSelf: "center",
        }),
    },

    backRow: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 20,
    },

    backText: {
        marginLeft: 6,
        color: "#2563EB",
        fontSize: 15,
        fontWeight: "600",
    },

    screenTitle: {
        fontSize: 30,
        fontWeight: "700",
        color: "#0F172A",
        marginBottom: 24,
    },

    patientCard: {
        backgroundColor: "#FFFFFF",
        borderRadius: 24,
        padding: 22,
        marginBottom: 22,

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.04,
        shadowRadius: 6,

        elevation: 3,
    },

    patientName: {
        fontSize: 22,
        fontWeight: "700",
        color: "#0F172A",
    },

    caseInfo: {
        marginTop: 8,
        fontSize: 14,
        color: "#64748B",
    },

    modeText: {
        marginTop: 8,
        fontSize: 14,
        color: "#2563EB",
        fontWeight: "600",
    },

    resultCard: {
        borderRadius: 26,
        paddingVertical: 30,
        alignItems: "center",
        marginBottom: 22,

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: 0.08,
        shadowRadius: 8,

        elevation: 6,
    },

    resultLabel: {
        color: "#FFFFFF",
        fontSize: 14,
        marginBottom: 10,
    },

    resultText: {
        color: "#FFFFFF",
        fontSize: 28,
        fontWeight: "800",
    },

    confidenceText: {
        color: "#FFFFFF",
        marginTop: 12,
        fontSize: 14,
        fontWeight: "600",
    },

    measurementCard: {
        backgroundColor: "#FFFFFF",
        borderRadius: 24,
        padding: 22,
        marginBottom: 22,

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.04,
        shadowRadius: 6,

        elevation: 3,
    },

    measurementRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },

    measurementLabel: {
        fontSize: 15,
        color: "#334155",
    },

    measurementValue: {
        fontSize: 15,
        fontWeight: "700",
        color: "#0F172A",
    },

    divider: {
        height: 1,
        backgroundColor: "#E2E8F0",
        marginVertical: 18,
    },

    recommendationCard: {
        borderRadius: 24,
        padding: 22,
        marginBottom: 22,
    },

    recommendationTitle: {
        fontSize: 18,
        fontWeight: "700",
        color: "#0F172A",
        marginBottom: 10,
    },

    recommendationText: {
        fontSize: 15,
        lineHeight: 24,
        color: "#334155",
    },

    notesCard: {
        backgroundColor: "#FFFFFF",
        borderRadius: 24,
        padding: 22,
        marginBottom: 26,

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.04,
        shadowRadius: 6,

        elevation: 3,
    },

    notesTitle: {
        fontSize: 18,
        fontWeight: "700",
        color: "#0F172A",
        marginBottom: 12,
    },

    notesText: {
        fontSize: 15,
        lineHeight: 24,
        color: "#334155",
    },

    downloadButton: {
        height: 60,
        borderRadius: 20,

        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",

        shadowColor: "#2563EB",
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: 0.2,
        shadowRadius: 8,

        elevation: 6,
    },

    downloadText: {
        color: "#FFFFFF",
        fontSize: 16,
        fontWeight: "700",
        marginLeft: 10,
    },

    modalOverlay: {
        flex: 1,
        backgroundColor: "rgba(15,23,42,0.45)",
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 30,
    },

    modalContainer: {
        width: "100%",
        backgroundColor: "#FFFFFF",
        borderRadius: 30,
        alignItems: "center",
        paddingVertical: 34,
        paddingHorizontal: 24,
    },

    successCircle: {
        width: 70,
        height: 70,
        borderRadius: 35,
        backgroundColor: "#2563EB",

        justifyContent: "center",
        alignItems: "center",

        marginBottom: 18,
    },

    modalTitle: {
        fontSize: 22,
        fontWeight: "700",
        color: "#0F172A",
        marginBottom: 10,
    },

    modalText: {
        fontSize: 14,
        color: "#64748B",
        textAlign: "center",
        marginBottom: 24,
    },

    okButton: {
        backgroundColor: "#2563EB",
        paddingHorizontal: 40,
        paddingVertical: 14,
        borderRadius: 16,
    },

    okText: {
        color: "#FFFFFF",
        fontWeight: "700",
        fontSize: 15,
    },

    scanCard: {
        backgroundColor: "#FFFFFF",
        borderRadius: 24,
        padding: 18,
        marginBottom: 22,

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.04,
        shadowRadius: 6,

        elevation: 3,
    },

    scanTitle: {
        fontSize: 17,
        fontWeight: "700",
        color: "#0F172A",
        marginBottom: 14,
    },

    scanImage: {
        width: "100%",
        height: 220,
        borderRadius: 20,
        backgroundColor: "#E2E8F0",
    },

});