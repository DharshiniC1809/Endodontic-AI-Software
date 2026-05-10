import React, {
    useState,
} from "react";

import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    Modal,
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

        if (report.status === "High") {

            return {
                colors: [
                    "#22C55E",
                    "#16A34A"
                ],
                label:
                    "HIGH SUCCESS",
            };
        }

        if (
            report.status === "Moderate"
        ) {

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
                        {report.patient}
                    </Text>

                    <Text style={styles.caseInfo}>
                        {report.id} • {report.date}
                    </Text>

                    <Text style={styles.modeText}>
                        {report.mode} Analysis
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
                        {result.label}
                    </Text>

                    <Text style={styles.confidenceText}>
                        AI Confidence: 94%
                    </Text>

                </LinearGradient>

                {/* MEASUREMENTS */}

                <View style={styles.measurementCard}>

                    <View style={styles.measurementRow}>

                        <Text style={styles.measurementLabel}>
                            Canal Depth
                        </Text>

                        <Text style={styles.measurementValue}>
                            Deep
                        </Text>

                    </View>

                    <View style={styles.divider} />

                    <View style={styles.measurementRow}>

                        <Text style={styles.measurementLabel}>
                            Canal Volume
                        </Text>

                        <Text style={styles.measurementValue}>
                            Adequate
                        </Text>

                    </View>

                    <View style={styles.divider} />

                    <View style={styles.measurementRow}>

                        <Text style={styles.measurementLabel}>
                            Canal Structure
                        </Text>

                        <Text style={styles.measurementValue}>
                            Favorable
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
                        Proceed with standard procedure.
                        AI analysis indicates stable anatomy.
                    </Text>

                </LinearGradient>

                {/* NOTES */}

                <View style={styles.notesCard}>

                    <Text style={styles.notesTitle}>
                        Notes
                    </Text>

                    <Text style={styles.notesText}>
                        3D scan shows clean canal structure.
                    </Text>

                </View>

                {/* DOWNLOAD BUTTON */}

                <TouchableOpacity
                    activeOpacity={0.85}
                    onPress={() =>
                        setDownloadModal(true)
                    }
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

                                navigation.navigate("Reports");

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

});