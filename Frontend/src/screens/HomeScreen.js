import React from "react";

import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

import { LinearGradient } from "expo-linear-gradient";

export default function HomeScreen({
    navigation,
    route
}) {

    const user =
        route?.params?.user;

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

            <View style={styles.header}>

                <Text style={styles.greeting}>
                    Hello, {user?.name || "Doctor"} 👋
                </Text>

                <Text style={styles.subtitle}>
                    AI-powered dental analysis
                </Text>

            </View>

            {/* MAIN ANALYSIS CARD */}

            <TouchableOpacity
                activeOpacity={0.9}
            >

                <LinearGradient
                    colors={["#3B82F6", "#2563EB", "#1D4ED8"]}
                    style={styles.analysisCard}
                >

                    <View style={styles.analysisIcon}>

                        <Ionicons
                            name="cloud-upload"
                            size={24}
                            color="#2563EB"
                        />

                    </View>

                    <View style={{ flex: 1 }}>

                        <Text style={styles.analysisTitle}>
                            Start Analysis
                        </Text>

                        <Text style={styles.analysisText}>
                            Upload X-ray or CBCT scan for AI prediction
                        </Text>

                        <TouchableOpacity
                            style={styles.analyzeButton}
                            activeOpacity={0.8}
                            onPress={() => navigation.navigate("SelectMode")}
                        >

                            <Text style={styles.analyzeButtonText}>
                                Analyze Now
                            </Text>

                        </TouchableOpacity>

                    </View>

                </LinearGradient>

            </TouchableOpacity>

            {/* QUICK CARDS */}

            <View style={styles.cardRow}>

                {/* HISTORY */}

                <TouchableOpacity
                    style={styles.smallCard}
                    activeOpacity={0.8}
                    onPress={() =>
                        navigation.navigate("History")
                    }
                >

                    <View style={styles.greenIcon}>

                        <Ionicons
                            name="time"
                            size={18}
                            color="#FFFFFF"
                        />

                    </View>

                    <Text style={styles.cardTitle}>
                        History
                    </Text>

                    <Text style={styles.cardSubtitle}>
                        Previous analyses
                    </Text>

                </TouchableOpacity>

                {/* REPORTS */}

                <TouchableOpacity
                    style={styles.smallCard}
                    onPress={() =>
                        navigation.navigate("Reports")
                    }
                >

                    <View style={styles.purpleIcon}>

                        <Ionicons
                            name="document-text"
                            size={18}
                            color="#FFFFFF"
                        />

                    </View>

                    <Text style={styles.cardTitle}>
                        Reports
                    </Text>

                    <Text style={styles.cardSubtitle}>
                        Download reports
                    </Text>

                </TouchableOpacity>

            </View>

            {/* CLINICAL TIP */}

            <View style={styles.tipCard}>

                <View style={styles.tipIcon}>

                    <Ionicons
                        name="information"
                        size={16}
                        color="#FFFFFF"
                    />

                </View>

                <View style={{ flex: 1 }}>

                    <Text style={styles.tipTitle}>
                        Clinical Tip
                    </Text>

                    <Text style={styles.tipText}>
                        Ensure the X-ray clearly shows the complete root canal region for accurate AI prediction.
                    </Text>

                </View>

            </View>

            {/* BOTTOM NAVIGATION */}

            <View style={styles.bottomNav}>

                {/* HOME */}

                <TouchableOpacity style={styles.navItem}>

                    <Ionicons
                        name="home"
                        size={22}
                        color="#2563EB"
                    />

                    <Text style={styles.activeNavText}>
                        Home
                    </Text>

                </TouchableOpacity>

                {/* PROFILE */}

                <TouchableOpacity
                    style={styles.navItem}
                    onPress={() =>
                        navigation.navigate(
                            "Profile",
                            {
                                user
                            }
                        )
                    }
                >

                    <Ionicons
                        name="person"
                        size={22}
                        color="#94A3B8"
                    />

                    <Text style={styles.navText}>
                        Profile
                    </Text>

                </TouchableOpacity>

            </View>

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

    header: {
        marginBottom: 30,
    },

    greeting: {
        fontSize: 28,
        fontWeight: "700",
        color: "#0F172A",
    },

    subtitle: {
        fontSize: 15,
        color: "#64748B",
        marginTop: 5,
    },

    analysisCard: {
        borderRadius: 28,
        padding: 25,
        flexDirection: "row",
        marginBottom: 25,

        shadowColor: "#2563EB",
        shadowOffset: {
            width: 0,
            height: 8,
        },
        shadowOpacity: 0.25,
        shadowRadius: 12,

        elevation: 8,
    },

    analysisIcon: {
        width: 56,
        height: 56,
        borderRadius: 28,
        backgroundColor: "#FFFFFF",
        justifyContent: "center",
        alignItems: "center",
        marginRight: 18,
    },

    analysisTitle: {
        color: "#FFFFFF",
        fontSize: 21,
        fontWeight: "700",
    },

    analysisText: {
        color: "#DBEAFE",
        fontSize: 13,
        marginTop: 6,
        lineHeight: 20,
    },

    analyzeButton: {
        backgroundColor: "#FFFFFF",
        alignSelf: "flex-start",
        paddingHorizontal: 18,
        paddingVertical: 10,
        borderRadius: 14,
        marginTop: 18,
    },

    analyzeButtonText: {
        color: "#2563EB",
        fontSize: 13,
        fontWeight: "700",
    },

    cardRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 25,
    },

    smallCard: {
        width: "47%",
        backgroundColor: "#FFFFFF",
        borderRadius: 22,
        paddingVertical: 28,
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

    greenIcon: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: "#10B981",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 12,
    },

    purpleIcon: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: "#8B5CF6",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 12,
    },

    cardTitle: {
        fontSize: 16,
        fontWeight: "700",
        color: "#0F172A",
    },

    cardSubtitle: {
        fontSize: 12,
        color: "#64748B",
        marginTop: 5,
    },

    tipCard: {
        backgroundColor: "#DBEAFE",
        borderRadius: 22,
        padding: 18,
        flexDirection: "row",
        alignItems: "flex-start",
    },

    tipIcon: {
        width: 30,
        height: 30,
        borderRadius: 15,
        backgroundColor: "#2563EB",
        justifyContent: "center",
        alignItems: "center",
        marginRight: 12,
    },

    tipTitle: {
        fontSize: 15,
        fontWeight: "700",
        color: "#0F172A",
    },

    tipText: {
        fontSize: 13,
        color: "#475569",
        marginTop: 5,
        lineHeight: 20,
    },

    bottomNav: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,

        flexDirection: "row",
        justifyContent: "space-around",

        backgroundColor: "#FFFFFF",

        paddingVertical: 16,

        borderTopLeftRadius: 26,
        borderTopRightRadius: 26,

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: -3,
        },
        shadowOpacity: 0.05,
        shadowRadius: 6,

        elevation: 10,
    },

    navItem: {
        alignItems: "center",
    },

    activeNavText: {
        color: "#2563EB",
        fontSize: 12,
        marginTop: 4,
        fontWeight: "700",
    },

    navText: {
        color: "#94A3B8",
        fontSize: 12,
        marginTop: 4,
    },

});