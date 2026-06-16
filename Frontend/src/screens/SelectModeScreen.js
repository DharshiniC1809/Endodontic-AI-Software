import React, { useState } from "react";

import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Platform,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

import { LinearGradient } from "expo-linear-gradient";

export default function SelectModeScreen({ navigation, route, }) {

    const user =
        route?.params?.user;

    const [selectedMode, setSelectedMode] = useState("");

    const renderCard = (
        mode,
        title,
        subtitle
    ) => {

        const isSelected = selectedMode === mode;

        if (isSelected) {

            return (

                <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => setSelectedMode(mode)}
                >

                    <LinearGradient
                        colors={["#3B82F6", "#2563EB", "#1D4ED8"]}
                        style={styles.activeGlossyCard}
                    >

                        <Text style={styles.activeTitle}>
                            {title}
                        </Text>

                        <Text style={styles.activeSubtitle}>
                            {subtitle}
                        </Text>

                    </LinearGradient>

                </TouchableOpacity>

            );
        }

        return (

            <TouchableOpacity
                style={styles.card}
                activeOpacity={0.8}
                onPress={() => setSelectedMode(mode)}
            >

                <Text style={styles.cardTitle}>
                    {title}
                </Text>

                <Text style={styles.cardSubtitle}>
                    {subtitle}
                </Text>

            </TouchableOpacity>

        );

    };

    return (

        <View style={styles.container}>

            {/* BACK BUTTON */}

            <TouchableOpacity
                style={styles.backRow}
                onPress={() => navigation.goBack()}
            >

                <Ionicons
                    name="arrow-back"
                    size={18}
                    color="#2563EB"
                />

                <Text style={styles.backText}>
                    Back
                </Text>

            </TouchableOpacity>

            {/* TITLE */}

            <Text style={styles.title}>
                Select Analysis Mode
            </Text>

            {/* X-RAY */}

            {renderCard(
                "xray",
                "X-ray",
                "2D image analysis"
            )}

            {/* CBCT */}

            {renderCard(
                "cbct",
                "CBCT",
                "3D detailed analysis"
            )}

            {/* CONTINUE BUTTON */}

            <TouchableOpacity
                style={[
                    styles.continueButton,
                    selectedMode && styles.activeButton
                ]}
                disabled={!selectedMode}
                activeOpacity={0.8}
                onPress={() =>
                    navigation.navigate("UploadScan", {
                        user,
                        mode: selectedMode
                    })
                }
            >

                <LinearGradient
                    colors={
                        selectedMode
                            ? ["#3B82F6", "#2563EB", "#1D4ED8"]
                            : ["#CBD5E1", "#CBD5E1"]
                    }
                    style={styles.gradientButton}
                >

                    <Text style={styles.continueText}>
                        Continue
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
        paddingHorizontal: 24,
        paddingTop: 70,

        ...(Platform.OS === "web" && {
            width: 544,
            alignSelf: "center",
        }),
    },

    backRow: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 28,
    },

    backText: {
        color: "#2563EB",
        fontSize: 15,
        marginLeft: 6,
        fontWeight: "500",
    },

    title: {
        fontSize: 28,
        fontWeight: "700",
        color: "#0F172A",
        marginBottom: 28,
    },

    card: {
        backgroundColor: "#FFFFFF",
        borderRadius: 22,
        paddingVertical: 24,
        paddingHorizontal: 20,
        marginBottom: 18,

        borderWidth: 1,
        borderColor: "#E2E8F0",

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.03,
        shadowRadius: 5,

        elevation: 2,
    },

    activeGlossyCard: {
        borderRadius: 22,
        paddingVertical: 24,
        paddingHorizontal: 20,
        marginBottom: 18,

        shadowColor: "#2563EB",
        shadowOffset: {
            width: 0,
            height: 8,
        },
        shadowOpacity: 0.28,
        shadowRadius: 10,

        elevation: 8,
    },

    cardTitle: {
        fontSize: 17,
        fontWeight: "700",
        color: "#0F172A",
    },

    activeTitle: {
        fontSize: 17,
        fontWeight: "700",
        color: "#FFFFFF",
    },

    cardSubtitle: {
        fontSize: 13,
        color: "#64748B",
        marginTop: 8,
    },

    activeSubtitle: {
        fontSize: 13,
        color: "#DBEAFE",
        marginTop: 8,
    },

    continueButton: {
        borderRadius: 18,
        overflow: "hidden",
        marginTop: 12,
    },

    gradientButton: {
        paddingVertical: 18,
        alignItems: "center",
        borderRadius: 18,
    },

    continueText: {
        color: "#FFFFFF",
        fontSize: 15,
        fontWeight: "700",
    },

});