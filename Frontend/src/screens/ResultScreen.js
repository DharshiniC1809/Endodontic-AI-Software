import React, {
    useState,
} from "react";

import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    TextInput,
    ScrollView,
    Modal,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

import { LinearGradient } from "expo-linear-gradient";

export default function ResultScreen({
    navigation,
    route,
}) {

    // SAFE MODE

    const mode =
        route?.params?.mode || "xray";

    // STATES

    const [notes, setNotes] =
        useState("");

    const [savedNotes, setSavedNotes] =
        useState("");

    const [saveModal, setSaveModal] =
        useState(false);

    const [analyzeModal, setAnalyzeModal] =
        useState(false);

    // RESULT DATA

    const resultData = {

        xray: {

            status: "MODERATE SUCCESS",

            color: [
                "#F59E0B",
                "#D97706"
            ],

            textColor: "#FFFFFF",

            measurements: [

                {
                    label:
                        "Remaining Dentin Thickness",

                    value: "0.8 mm",
                },

                {
                    label:
                        "Root Canal Curvature",

                    value: "32°",
                },
            ],

            recommendation:
                "Proceed with caution. Use specialized instruments.",
        },

        cbct: {

            status: "LOW SUCCESS",

            color: [
                "#EF4444",
                "#DC2626"
            ],

            textColor: "#FFFFFF",

            measurements: [

                {
                    label:
                        "Canal Depth",

                    value: "Deep",
                },

                {
                    label:
                        "Canal Volume",

                    value: "Adequate",
                },

                {
                    label:
                        "Canal Structure",

                    value: "Favorable",
                },
            ],

            recommendation:
                "Complex canal anatomy detected. Additional care is recommended.",
        },

        both: {

            status: "FINAL: HIGH SUCCESS",

            color: [
                "#10B981",
                "#059669"
            ],

            textColor: "#FFFFFF",

            measurements: [

                {
                    label:
                        "Remaining Dentin Thickness",

                    value: "0.8 mm",
                },

                {
                    label:
                        "Root Canal Curvature",

                    value: "32°",
                },

                {
                    label:
                        "Canal Structure",

                    value: "Favorable",
                },
            ],

            recommendation:
                "Combined analysis shows high treatment success probability.",
        },
    };

    // CURRENT DATA

    const data =
        resultData[mode];

    return (

        <ScrollView
            style={styles.container}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
                paddingBottom: 140,
            }}
        >

            {/* HEADER */}

            <View style={styles.headerSection}>

                <Text style={styles.title}>
                    Analysis Result
                </Text>

                <Text style={styles.subtitle}>
                    AI-powered endodontic prediction summary
                </Text>

            </View>

            {/* RESULT CARD */}

            <LinearGradient
                colors={data.color}
                style={styles.resultCard}
            >

                <Text
                    style={[
                        styles.predictionLabel,
                        {
                            color:
                                data.textColor
                        }
                    ]}
                >

                    {
                        mode === "xray"
                            ? "Prediction (X-ray)"
                            : mode === "cbct"
                                ? "Prediction (CBCT)"
                                : "Prediction (Combined)"
                    }

                </Text>

                {
                    mode === "both" && (

                        <Text
                            style={[
                                styles.smallResult,
                                {
                                    color:
                                        data.textColor
                                }
                            ]}
                        >

                            X-ray: MODERATE SUCCESS
                            {"\n"}
                            CBCT: LOW SUCCESS

                        </Text>

                    )
                }

                <Text
                    style={[
                        styles.resultText,
                        {
                            color:
                                data.textColor
                        }
                    ]}
                >

                    {data.status}

                </Text>

            </LinearGradient>

            {/* MEASUREMENTS */}

            <View style={styles.measurementCard}>

                {
                    data.measurements.map(
                        (
                            item,
                            index
                        ) => (

                            <View
                                key={index}
                                style={styles.measurementRow}
                            >

                                <Text
                                    style={styles.measurementLabel}
                                >

                                    {item.label}

                                </Text>

                                <Text
                                    style={styles.measurementValue}
                                >

                                    {item.value}

                                </Text>

                            </View>

                        )
                    )
                }

            </View>

            {/* RECOMMENDATION */}

            <LinearGradient
                colors={[
                    "#DBEAFE",
                    "#E0F2FE"
                ]}
                style={styles.recommendationCard}
            >

                <Text
                    style={styles.recommendationTitle}
                >
                    AI Recommendation
                </Text>

                <Text
                    style={styles.recommendationText}
                >

                    {data.recommendation}

                </Text>

            </LinearGradient>

            {/* NOTES */}

            <View style={styles.notesCard}>

                <Text style={styles.notesTitle}>
                    Notes
                </Text>

                <Text style={styles.notesSubtitle}>
                    Add clinical observations
                    (optional)
                </Text>

                <TextInput
                    placeholder="Type notes here..."
                    placeholderTextColor="#94A3B8"
                    style={styles.notesInput}
                    multiline
                    value={notes}
                    onChangeText={setNotes}
                />

                {/* SAVE NOTES */}

                <TouchableOpacity
                    style={styles.notesButton}
                    onPress={() =>
                        setSavedNotes(notes)
                    }
                >

                    <Text style={styles.notesButtonText}>
                        Save Notes
                    </Text>

                </TouchableOpacity>

                {/* SAVED NOTES */}

                {
                    savedNotes ? (

                        <View style={styles.savedNotesBox}>

                            <Text style={styles.savedNotesTitle}>
                                Saved Notes
                            </Text>

                            <Text style={styles.savedNotesText}>
                                {savedNotes}
                            </Text>

                        </View>

                    ) : null
                }

            </View>

            {/* ACTION BUTTONS */}

            <View style={styles.buttonRow}>

                {/* SAVE CASE */}

                <TouchableOpacity
                    activeOpacity={0.85}
                    style={styles.buttonWrapper}
                    onPress={() =>
                        setSaveModal(true)
                    }
                >

                    <LinearGradient
                        colors={[
                            "#3B82F6",
                            "#2563EB",
                            "#1D4ED8"
                        ]}
                        style={styles.saveButton}
                    >

                        <Text style={styles.buttonText}>
                            Save Case
                        </Text>

                    </LinearGradient>

                </TouchableOpacity>

                {/* ANALYZE AGAIN */}

                <TouchableOpacity
                    activeOpacity={0.85}
                    style={styles.buttonWrapper}
                    onPress={() =>
                        setAnalyzeModal(true)
                    }
                >

                    <LinearGradient
                        colors={[
                            "#14B8A6",
                            "#0D9488"
                        ]}
                        style={styles.againButton}
                    >

                        <Text style={styles.buttonText}>
                            Analyze Again
                        </Text>

                    </LinearGradient>

                </TouchableOpacity>

            </View>

            {/* SAVE MODAL */}

            <Modal
                transparent={true}
                visible={saveModal}
                animationType="fade"
            >

                <View style={styles.modalOverlay}>

                    <View style={styles.modalContainer}>

                        <View
                            style={styles.successCircle}
                        >

                            <Ionicons
                                name="checkmark"
                                size={30}
                                color="#FFFFFF"
                            />

                        </View>

                        <Text style={styles.modalTitle}>
                            Case Saved
                        </Text>

                        <Text style={styles.modalText}>
                            Your case has been saved successfully
                        </Text>

                        <TouchableOpacity
                            style={styles.okButton}
                            onPress={() => {

                                setSaveModal(false);

                                navigation.navigate("Home");

                            }}
                        >

                            <Text style={styles.okText}>
                                OK
                            </Text>

                        </TouchableOpacity>

                    </View>

                </View>

            </Modal>

            {/* ANALYZE AGAIN MODAL */}

            <Modal
                transparent={true}
                visible={analyzeModal}
                animationType="fade"
            >

                <View style={styles.modalOverlay}>

                    <View style={styles.modalContainer}>

                        <View
                            style={styles.warningCircle}
                        >

                            <Ionicons
                                name="refresh"
                                size={30}
                                color="#FFFFFF"
                            />

                        </View>

                        <Text style={styles.modalTitle}>
                            Analyze Again?
                        </Text>

                        <Text style={styles.modalText}>
                            Current analysis will be closed.
                        </Text>

                        <View style={styles.modalButtonRow}>

                            {/* CANCEL */}

                            <TouchableOpacity
                                style={styles.cancelButton}
                                onPress={() =>
                                    setAnalyzeModal(false)
                                }
                            >

                                <Text style={styles.cancelText}>
                                    Cancel
                                </Text>

                            </TouchableOpacity>

                            {/* YES */}

                            <TouchableOpacity
                                style={styles.yesButton}
                                onPress={() => {

                                    setAnalyzeModal(false);

                                    navigation.navigate(
                                        "SelectMode"
                                    );

                                }}
                            >

                                <Text style={styles.yesText}>
                                    Yes
                                </Text>

                            </TouchableOpacity>

                        </View>

                    </View>

                </View>

            </Modal>

        </ScrollView>

    );
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: "#F8FAFC",
        paddingHorizontal: 22,
        paddingTop: 70,
    },

    headerSection: {
        marginBottom: 24,
    },

    title: {
        fontSize: 30,
        fontWeight: "700",
        color: "#0F172A",
    },

    subtitle: {
        marginTop: 6,
        fontSize: 14,
        color: "#64748B",
    },

    resultCard: {
        borderRadius: 28,
        paddingVertical: 30,
        paddingHorizontal: 22,
        alignItems: "center",
        marginBottom: 22,

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 8,
        },
        shadowOpacity: 0.08,
        shadowRadius: 10,

        elevation: 6,
    },

    predictionLabel: {
        fontSize: 14,
        marginBottom: 12,
        fontWeight: "600",
    },

    smallResult: {
        textAlign: "center",
        fontSize: 13,
        lineHeight: 22,
        marginBottom: 12,
        fontWeight: "700",
    },

    resultText: {
        fontSize: 30,
        fontWeight: "800",
        textAlign: "center",
    },

    measurementCard: {
        backgroundColor: "#FFFFFF",
        borderRadius: 22,
        padding: 20,
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
        marginBottom: 18,
    },

    measurementLabel: {
        fontSize: 14,
        color: "#334155",
        flex: 1,
    },

    measurementValue: {
        fontSize: 14,
        fontWeight: "700",
        color: "#0F172A",
    },

    recommendationCard: {
        borderRadius: 22,
        padding: 20,
        marginBottom: 22,
    },

    recommendationTitle: {
        fontSize: 16,
        fontWeight: "700",
        color: "#0F172A",
        marginBottom: 10,
    },

    recommendationText: {
        fontSize: 14,
        lineHeight: 22,
        color: "#334155",
    },

    notesCard: {
        backgroundColor: "#FFFFFF",
        borderRadius: 22,
        padding: 20,
        marginBottom: 28,

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
        fontSize: 16,
        fontWeight: "700",
        color: "#0F172A",
    },

    notesSubtitle: {
        fontSize: 13,
        color: "#64748B",
        marginTop: 6,
        marginBottom: 14,
    },

    notesInput: {
        borderWidth: 1,
        borderColor: "#CBD5E1",
        borderRadius: 16,
        paddingHorizontal: 14,
        paddingVertical: 14,
        fontSize: 14,
        color: "#0F172A",
        minHeight: 100,
        textAlignVertical: "top",
        backgroundColor: "#F8FAFC",
    },

    notesButton: {
        backgroundColor: "#2563EB",
        marginTop: 16,
        paddingVertical: 14,
        borderRadius: 14,
        alignItems: "center",

        shadowColor: "#2563EB",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.2,
        shadowRadius: 6,

        elevation: 4,
    },

    notesButtonText: {
        color: "#FFFFFF",
        fontSize: 14,
        fontWeight: "700",
    },

    savedNotesBox: {
        marginTop: 18,
        backgroundColor: "#EFF6FF",
        borderRadius: 16,
        padding: 14,
    },

    savedNotesTitle: {
        fontSize: 13,
        fontWeight: "700",
        color: "#2563EB",
        marginBottom: 8,
    },

    savedNotesText: {
        fontSize: 14,
        lineHeight: 22,
        color: "#334155",
    },

    buttonRow: {
        flexDirection: "row",
        justifyContent: "space-between",
    },

    buttonWrapper: {
        flex: 1,
    },

    saveButton: {
        paddingVertical: 18,
        borderRadius: 18,
        alignItems: "center",
        marginRight: 8,
    },

    againButton: {
        paddingVertical: 18,
        borderRadius: 18,
        alignItems: "center",
        marginLeft: 8,
    },

    buttonText: {
        color: "#FFFFFF",
        fontSize: 15,
        fontWeight: "700",
    },

    modalOverlay: {
        flex: 1,
        backgroundColor: "rgba(15,23,42,0.45)",
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 30,
    },

    modalContainer: {
        backgroundColor: "#FFFFFF",
        borderRadius: 30,
        width: "100%",
        alignItems: "center",
        paddingVertical: 36,
        paddingHorizontal: 24,
    },

    successCircle: {
        width: 72,
        height: 72,
        borderRadius: 36,
        backgroundColor: "#2563EB",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 18,
    },

    warningCircle: {
        width: 72,
        height: 72,
        borderRadius: 36,
        backgroundColor: "#F59E0B",
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
        lineHeight: 22,
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
        fontSize: 15,
        fontWeight: "700",
    },

    modalButtonRow: {
        flexDirection: "row",
        marginTop: 10,
    },

    cancelButton: {
        backgroundColor: "#E2E8F0",
        paddingHorizontal: 28,
        paddingVertical: 14,
        borderRadius: 14,
        marginRight: 10,
    },

    yesButton: {
        backgroundColor: "#2563EB",
        paddingHorizontal: 36,
        paddingVertical: 14,
        borderRadius: 14,
    },

    cancelText: {
        color: "#334155",
        fontWeight: "700",
    },

    yesText: {
        color: "#FFFFFF",
        fontWeight: "700",
    },

});