import React, {
    useState,
} from "react";

import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Modal,
    TextInput,
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
            "File slightly curved. Careful handling required."
        );

    const [editModal, setEditModal] =
        useState(false);

    const [tempNotes, setTempNotes] =
        useState(notes);

    const [showSaved, setShowSaved] =
        useState(false);

    // STATUS COLORS

    const getResultData = () => {

        if (
            caseData.status ===
            "High Success"
        ) {

            return {
                colors: [
                    "#22C55E",
                    "#16A34A"
                ],
                label:
                    "FINAL: HIGH SUCCESS",
            };
        }

        if (
            caseData.status ===
            "Moderate"
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
                    Case Detail
                </Text>

                {/* PATIENT CARD */}

                <View style={styles.patientCard}>

                    <Text style={styles.patientName}>
                        {caseData.patient}
                    </Text>

                    <Text style={styles.caseInfo}>
                        {caseData.id} • {caseData.date}
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
                        AI Confidence: 94%
                    </Text>

                </LinearGradient>

                {/* MEASUREMENTS */}

                <View style={styles.measurementCard}>

                    <View style={styles.measurementRow}>

                        <Text style={styles.measurementLabel}>
                            Remaining Dentin Thickness
                        </Text>

                        <Text style={styles.measurementValue}>
                            0.8 mm
                        </Text>

                    </View>

                    <View style={styles.divider} />

                    <View style={styles.measurementRow}>

                        <Text style={styles.measurementLabel}>
                            Root Canal Curvature
                        </Text>

                        <Text style={styles.measurementValue}>
                            32°
                        </Text>

                    </View>

                    <Text style={styles.analysisText}>
                        Based on combined X-ray and CBCT analysis
                    </Text>

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
                        Combined analysis shows high success rate.
                        Proceed normally.
                    </Text>

                </LinearGradient>

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
                                onPress={() => {

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

});