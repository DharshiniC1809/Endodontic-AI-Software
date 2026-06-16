import React from "react";

import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    Platform,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

export default function PrivacyPolicyScreen({ navigation }) {

    return (

        <ScrollView
            style={styles.container}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
                paddingBottom: 120,
                flexGrow: 1,
            }}
        >

            {/* HEADER */}

            <View style={styles.headerRow}>

                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => navigation.goBack()}
                >

                    <Ionicons
                        name="arrow-back"
                        size={22}
                        color="#0F172A"
                    />

                </TouchableOpacity>

                <Text style={styles.headerTitle}>
                    Privacy Policy
                </Text>

                <View style={{ width: 42 }} />

            </View>

            {/* TOP CARD */}

            <View style={styles.topCard}>

                <View style={styles.iconContainer}>

                    <Ionicons
                        name="shield-checkmark"
                        size={42}
                        color="#2563EB"
                    />

                </View>

                <Text style={styles.topTitle}>
                    Your Privacy Matters
                </Text>

                <Text style={styles.topSubtitle}>
                    We protect your medical and personal information securely
                </Text>

            </View>

            {/* POLICY CONTENT */}

            <View style={styles.policyCard}>

                <Text style={styles.sectionTitle}>
                    Information Collection
                </Text>

                <Text style={styles.sectionText}>
                    Endodontic AI collects only necessary information such as profile details and uploaded dental scans to provide AI-based analysis services.
                </Text>

            </View>

            <View style={styles.policyCard}>

                <Text style={styles.sectionTitle}>
                    Data Security
                </Text>

                <Text style={styles.sectionText}>
                    Your uploaded scans and personal information are stored securely and protected using modern encryption techniques.
                </Text>

            </View>

            <View style={styles.policyCard}>

                <Text style={styles.sectionTitle}>
                    Medical Privacy
                </Text>

                <Text style={styles.sectionText}>
                    Patient data and scan reports are confidential and accessible only to authorized users.
                </Text>

            </View>

            <View style={styles.policyCard}>

                <Text style={styles.sectionTitle}>
                    AI Predictions
                </Text>

                <Text style={styles.sectionText}>
                    AI-generated predictions are intended to assist dental professionals and should not replace clinical judgment.
                </Text>

            </View>

        </ScrollView>

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

    headerRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 28,
    },

    backButton: {
        width: 42,
        height: 42,
        borderRadius: 21,
        backgroundColor: "#FFFFFF",
        justifyContent: "center",
        alignItems: "center",

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.05,
        shadowRadius: 6,

        elevation: 3,
    },

    headerTitle: {
        fontSize: 24,
        fontWeight: "700",
        color: "#0F172A",
    },

    topCard: {
        backgroundColor: "#2563EB",
        borderRadius: 30,
        paddingVertical: 35,
        paddingHorizontal: 25,
        alignItems: "center",
        marginBottom: 30,

        shadowColor: "#2563EB",
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.25,
        shadowRadius: 12,

        elevation: 8,
    },

    iconContainer: {
        width: 95,
        height: 95,
        borderRadius: 47.5,
        backgroundColor: "#FFFFFF",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 18,
    },

    topTitle: {
        fontSize: 22,
        fontWeight: "700",
        color: "#FFFFFF",
    },

    topSubtitle: {
        fontSize: 13,
        color: "#DBEAFE",
        marginTop: 8,
        textAlign: "center",
        lineHeight: 20,
    },

    policyCard: {
        backgroundColor: "#FFFFFF",
        borderRadius: 22,
        padding: 20,
        marginBottom: 18,

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.04,
        shadowRadius: 6,

        elevation: 2,
    },

    sectionTitle: {
        fontSize: 16,
        fontWeight: "700",
        color: "#0F172A",
        marginBottom: 10,
    },

    sectionText: {
        fontSize: 14,
        color: "#64748B",
        lineHeight: 22,
    },

});