import React, {
    useState,
} from "react";

import {
    updateNotes
} from "../services/api";

import {
    deleteCase
} from "../services/api";

import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Modal,
    TextInput,
    Image,
} from "react-native";

import {
    Ionicons,
} from "@expo/vector-icons";

import {
    LinearGradient,
} from "expo-linear-gradient";

export default function CaseDetailScreen({
    navigation,
    route,
}) {

    const {
        caseData,
    } = route.params;

    const [notes, setNotes] =
        useState(
            caseData.notes || ""
        );

    const [editModal, setEditModal] =
        useState(false);

    const [tempNotes, setTempNotes] =
        useState(notes);

    const [showSaved, setShowSaved] =
        useState(false);

    const [deleteModal, setDeleteModal] =
        useState(false);

    // STATUS COLORS

    const result =
        caseData.prediction === "HIGH"
            ? {
                colors: [
                    "#22C55E",
                    "#16A34A"
                ],
                label:
                    "HIGH SUCCESS"
            }
            : caseData.prediction === "LOW"
                ? {
                    colors: [
                        "#EF4444",
                        "#DC2626"
                    ],
                    label:
                        "LOW SUCCESS"
                }
                : {
                    colors: [
                        "#F59E0B",
                        "#D97706"
                    ],
                    label:
                        "MODERATE SUCCESS"
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
                    Case Detail
                </Text>

                {/* PATIENT CARD */}

                <View style={styles.patientCard}>

                    <Text style={styles.patientName}>
                        {caseData.patientName}
                    </Text>

                    <Text style={styles.caseInfo}>
                        Age: {caseData.patientAge || "N/A"}
                    </Text>

                    <Text style={styles.modeText}>
                        {caseData.mode} Analysis
                    </Text>

                </View>

                {/* RESULT CARD */}

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
                        AI Confidence: {caseData.confidence?.toFixed(2)}%
                    </Text>

                </LinearGradient>

                {/* MEASUREMENTS */}

                <View style={styles.measurementCard}>

                    <View style={styles.measurementRow}>
                        <Text style={styles.measurementLabel}>
                            Mean Intensity
                        </Text>

                        <Text style={styles.measurementValue}>
                            {caseData.meanIntensity?.toFixed(2)}
                        </Text>
                    </View>

                    <View style={styles.measurementRow}>
                        <Text style={styles.measurementLabel}>
                            Edge Density
                        </Text>

                        <Text style={styles.measurementValue}>
                            {caseData.edgeDensity?.toFixed(4)}
                        </Text>
                    </View>

                    <View style={styles.measurementRow}>
                        <Text style={styles.measurementLabel}>
                            Contrast
                        </Text>

                        <Text style={styles.measurementValue}>
                            {caseData.contrast?.toFixed(2)}
                        </Text>
                    </View>

                    <View style={styles.measurementRow}>
                        <Text style={styles.measurementLabel}>
                            Homogeneity
                        </Text>

                        <Text style={styles.measurementValue}>
                            {caseData.homogeneity?.toFixed(2)}
                        </Text>
                    </View>

                    <View style={styles.measurementRow}>
                        <Text style={styles.measurementLabel}>
                            Energy
                        </Text>

                        <Text style={styles.measurementValue}>
                            {caseData.energy?.toFixed(2)}
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

                    <View style={styles.recommendationRow}>

                        <Ionicons
                            name="sparkles"
                            size={20}
                            color="#2563EB"
                        />

                        <Text style={styles.recommendationTitle}>
                            AI Recommendation
                        </Text>

                    </View>

                    <Text style={styles.recommendationText}>
                        {
                            caseData.prediction === "HIGH"
                                ? "High probability of successful treatment."
                                : caseData.prediction === "LOW"
                                    ? "Low success probability. Further examination recommended."
                                    : "Moderate success expected. Clinical review recommended."
                        }
                    </Text>

                </LinearGradient>

                {/* X-RAY SCAN */}

                {
                    caseData.mode === "xray" ||
                        caseData.mode === "Combined"
                        ? (

                            <View style={styles.scanCard}>

                                <Text style={styles.scanTitle}>
                                    X-ray Scan
                                </Text>

                                <Image
                                    source={{
                                        uri:
                                            caseData.xrayImage
                                    }}
                                    style={styles.scanImage}
                                />

                            </View>

                        ) : null
                }

                {/* CBCT SCAN */}

                {
                    caseData.mode === "cbct" ||
                        caseData.mode === "Combined"
                        ? (

                            <View style={styles.scanCard}>

                                <Text style={styles.scanTitle}>
                                    CBCT Scan
                                </Text>

                                <Image
                                    source={{
                                        uri:
                                            caseData.cbctImage
                                    }}
                                    style={styles.scanImage}
                                />

                            </View>

                        ) : null
                }

                {/* NOTES */}

                <View style={styles.notesCard}>

                    <View style={styles.notesHeader}>

                        <Text style={styles.notesTitle}>
                            Notes
                        </Text>

                        <TouchableOpacity
                            onPress={() => {

                                setTempNotes(notes);

                                setEditModal(true);

                            }}
                        >

                            <Text style={styles.editText}>
                                ✏ Edit
                            </Text>

                        </TouchableOpacity>

                    </View>

                    <Text style={styles.notesContent}>
                        {notes}
                    </Text>

                </View>

            </ScrollView>

            {/* EDIT NOTES MODAL */}

            <Modal
                transparent={true}
                visible={editModal}
                animationType="fade"
            >

                <View style={styles.modalOverlay}>

                    <View style={styles.modalContainer}>

                        <Text style={styles.modalTitle}>
                            Edit Notes
                        </Text>

                        <TextInput
                            multiline
                            value={tempNotes}
                            onChangeText={setTempNotes}
                            placeholder="Edit your notes..."
                            placeholderTextColor="#94A3B8"
                            style={styles.modalInput}
                        />

                        <View style={styles.modalButtons}>

                            {/* CANCEL */}

                            <TouchableOpacity
                                style={styles.cancelButton}
                                onPress={() =>
                                    setEditModal(false)
                                }
                            >

                                <Text style={styles.cancelText}>
                                    Cancel
                                </Text>

                            </TouchableOpacity>

                            {/* SAVE */}

                            <TouchableOpacity
                                style={styles.saveButton}
                                onPress={async () => {

                                    try {

                                        await updateNotes(
                                            caseData._id,
                                            tempNotes
                                        );

                                        setNotes(tempNotes);

                                        setEditModal(false);

                                        setShowSaved(true);

                                    } catch (error) {

                                        alert("Failed to save notes");

                                    }

                                    setNotes(tempNotes);

                                    setEditModal(false);

                                    setShowSaved(true);

                                    setTimeout(() => {

                                        setShowSaved(false);

                                    }, 2000);

                                }}
                            >

                                <Text style={styles.saveText}>
                                    Save
                                </Text>

                            </TouchableOpacity>

                        </View>

                    </View>

                </View>

            </Modal>

            {/* SUCCESS MODAL */}

            <Modal
                transparent={true}
                visible={showSaved}
                animationType="fade"
            >

                <View style={styles.successOverlay}>

                    <View style={styles.successPopup}>

                        <LinearGradient
                            colors={[
                                "#22C55E",
                                "#16A34A"
                            ]}
                            style={styles.successCircle}
                        >

                            <Ionicons
                                name="checkmark"
                                size={34}
                                color="#FFFFFF"
                            />

                        </LinearGradient>

                        <Text style={styles.successTitle}>
                            Notes Saved
                        </Text>

                        <Text style={styles.successSubtitle}>
                            Clinical notes updated successfully
                        </Text>

                    </View>

                </View>

            </Modal>

            {/* DELETE MODAL */}

            <Modal
                transparent={true}
                visible={deleteModal}
                animationType="fade"
            >

                <View style={styles.modalOverlay}>

                    <View style={styles.deleteModalContainer}>

                        {/* ICON */}

                        <View style={styles.deleteCircle}>

                            <Ionicons
                                name="trash"
                                size={34}
                                color="#FFFFFF"
                            />

                        </View>

                        {/* TITLE */}

                        <Text style={styles.deleteTitle}>
                            Delete Case?
                        </Text>

                        <Text style={styles.deleteSubtitle}>
                            This action cannot be undone.
                        </Text>

                        {/* BUTTONS */}

                        <View style={styles.deleteButtonsRow}>

                            {/* CANCEL */}

                            <TouchableOpacity
                                style={styles.keepButton}
                                onPress={() =>
                                    setDeleteModal(false)
                                }
                            >

                                <Text style={styles.keepText}>
                                    Cancel
                                </Text>

                            </TouchableOpacity>

                            {/* DELETE */}

                            <TouchableOpacity
                                style={styles.confirmDeleteButton}
                                onPress={async () => {

                                    const result =
                                        await deleteCase(
                                            caseData._id
                                        );

                                    if (result.success) {

                                        setDeleteModal(false);

                                        navigation.goBack();

                                    }

                                }}
                            >

                                <Text style={styles.confirmDeleteText}>
                                    Delete
                                </Text>

                            </TouchableOpacity>

                        </View>

                    </View>

                </View>

            </Modal>

            {/* DELETE BUTTON */}

            <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => setDeleteModal(true)}
            >

                <LinearGradient
                    colors={["#EF4444", "#DC2626"]}
                    style={styles.deleteButton}
                >

                    <Ionicons
                        name="trash"
                        size={18}
                        color="#FFFFFF"
                    />

                    <Text style={styles.deleteButtonText}>
                        Delete Case
                    </Text>

                </LinearGradient>

            </TouchableOpacity>

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
        marginBottom: 24,
    },

    backText: {
        color: "#2563EB",
        marginLeft: 6,
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
        marginBottom: 14,
    },

    measurementLabel: {
        flex: 1,
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

    analysisText: {
        marginTop: 18,
        fontSize: 13,
        color: "#64748B",
    },

    recommendationCard: {
        borderRadius: 24,
        padding: 22,
        marginBottom: 22,
    },

    recommendationRow: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 12,
    },

    recommendationTitle: {
        marginLeft: 8,
        fontSize: 17,
        fontWeight: "700",
        color: "#0F172A",
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

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.04,
        shadowRadius: 6,

        elevation: 3,
    },

    notesHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 14,
    },

    notesTitle: {
        fontSize: 18,
        fontWeight: "700",
        color: "#0F172A",
    },

    editText: {
        color: "#2563EB",
        fontWeight: "700",
    },

    notesContent: {
        fontSize: 15,
        lineHeight: 24,
        color: "#334155",
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
        padding: 26,
    },

    modalTitle: {
        fontSize: 24,
        fontWeight: "700",
        color: "#0F172A",
        textAlign: "center",
        marginBottom: 22,
    },

    modalInput: {
        minHeight: 130,
        borderWidth: 1,
        borderColor: "#CBD5E1",
        borderRadius: 20,
        padding: 18,
        textAlignVertical: "top",
        fontSize: 15,
        color: "#0F172A",
        backgroundColor: "#F8FAFC",
    },

    modalButtons: {
        flexDirection: "row",
        marginTop: 22,
    },

    cancelButton: {
        flex: 1,
        backgroundColor: "#E2E8F0",
        paddingVertical: 16,
        borderRadius: 18,
        alignItems: "center",
        marginRight: 8,
    },

    saveButton: {
        flex: 1,
        backgroundColor: "#2563EB",
        paddingVertical: 16,
        borderRadius: 18,
        alignItems: "center",
        marginLeft: 8,
    },

    cancelText: {
        color: "#475569",
        fontWeight: "700",
        fontSize: 15,
    },

    saveText: {
        color: "#FFFFFF",
        fontWeight: "700",
        fontSize: 15,
    },

    successOverlay: {
        flex: 1,
        backgroundColor: "rgba(15,23,42,0.35)",
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 40,
    },

    successPopup: {
        width: "100%",
        backgroundColor: "#FFFFFF",
        borderRadius: 34,

        paddingVertical: 36,
        paddingHorizontal: 28,

        alignItems: "center",

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.15,
        shadowRadius: 12,

        elevation: 10,
    },

    successCircle: {
        width: 92,
        height: 92,
        borderRadius: 46,

        justifyContent: "center",
        alignItems: "center",

        marginBottom: 24,
    },

    successTitle: {
        fontSize: 24,
        fontWeight: "700",
        color: "#0F172A",
    },

    successSubtitle: {
        marginTop: 10,
        fontSize: 14,
        color: "#64748B",
        textAlign: "center",
        lineHeight: 22,
    },

    deleteButton: {
        marginTop: 20,
        marginBottom: 20,

        height: 58,
        borderRadius: 20,

        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",

        shadowColor: "#EF4444",
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: 0.22,
        shadowRadius: 8,

        elevation: 6,
    },

    deleteButtonText: {
        color: "#FFFFFF",
        fontSize: 16,
        fontWeight: "700",
        marginLeft: 10,
    },

    deleteModalContainer: {
        width: "100%",
        backgroundColor: "#FFFFFF",

        borderRadius: 34,

        paddingVertical: 36,
        paddingHorizontal: 28,

        alignItems: "center",
    },

    deleteCircle: {
        width: 92,
        height: 92,
        borderRadius: 46,

        backgroundColor: "#EF4444",

        justifyContent: "center",
        alignItems: "center",

        marginBottom: 24,
    },

    deleteTitle: {
        fontSize: 24,
        fontWeight: "700",
        color: "#0F172A",
    },

    deleteSubtitle: {
        marginTop: 10,
        fontSize: 14,
        color: "#64748B",
        textAlign: "center",
        lineHeight: 22,
    },

    deleteButtonsRow: {
        flexDirection: "row",
        marginTop: 30,
    },

    keepButton: {
        flex: 1,
        backgroundColor: "#E2E8F0",

        paddingVertical: 16,

        borderRadius: 18,

        alignItems: "center",

        marginRight: 8,
    },

    confirmDeleteButton: {
        flex: 1,
        backgroundColor: "#EF4444",

        paddingVertical: 16,

        borderRadius: 18,

        alignItems: "center",

        marginLeft: 8,
    },

    keepText: {
        color: "#475569",
        fontWeight: "700",
        fontSize: 15,
    },

    confirmDeleteText: {
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