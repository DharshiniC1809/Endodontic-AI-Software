import React from "react";

import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

export default function HelpSupportScreen({ navigation }) {

    return (

        <ScrollView
            style={styles.container}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
                paddingBottom: 140,
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
                    Help & Support
                </Text>

                <View style={{ width: 42 }} />

            </View>

            {/* TOP CARD */}

            <View style={styles.topCard}>

                <View style={styles.helpIconContainer}>

                    <Ionicons
                        name="help-circle"
                        size={42}
                        color="#2563EB"
                    />

                </View>

                <Text style={styles.topTitle}>
                    We’re Here to Help
                </Text>

                <Text style={styles.topSubtitle}>
                    Contact support or browse frequently asked questions
                </Text>

            </View>

            {/* CONTACT SECTION */}

            <Text style={styles.sectionTitle}>
                Contact Support
            </Text>

            {/* EMAIL */}

            <TouchableOpacity style={styles.card}>

                <View style={styles.cardLeft}>

                    <View style={styles.blueIcon}>

                        <Ionicons
                            name="mail-outline"
                            size={18}
                            color="#FFFFFF"
                        />

                    </View>

                    <View>

                        <Text style={styles.cardTitle}>
                            Email Support
                        </Text>

                        <Text style={styles.cardSubtitle}>
                            c.dharshini1809@gmail.com
                        </Text>

                    </View>

                </View>

            </TouchableOpacity>

            {/* PHONE */}

            <TouchableOpacity style={styles.card}>

                <View style={styles.cardLeft}>

                    <View style={styles.greenIcon}>

                        <Ionicons
                            name="call-outline"
                            size={18}
                            color="#FFFFFF"
                        />

                    </View>

                    <View>

                        <Text style={styles.cardTitle}>
                            Phone Support
                        </Text>

                        <Text style={styles.cardSubtitle}>
                            +91 80562 36837
                        </Text>

                    </View>

                </View>

            </TouchableOpacity>

            {/* FAQ SECTION */}

            <Text style={styles.sectionTitle}>
                Frequently Asked Questions
            </Text>

            {/* FAQ 1 */}

            <View style={styles.faqCard}>

                <Text style={styles.faqQuestion}>
                    How to upload scans?
                </Text>

                <Text style={styles.faqAnswer}>
                    Go to the Home screen and click “Analyze Now” to upload X-ray or CBCT scans.
                </Text>

            </View>

            {/* FAQ 2 */}

            <View style={styles.faqCard}>

                <Text style={styles.faqQuestion}>
                    Which file types are supported?
                </Text>

                <Text style={styles.faqAnswer}>
                    JPG, PNG, JPEG and DICOM formats are supported.
                </Text>

            </View>

            {/* FAQ 3 */}

            <View style={styles.faqCard}>

                <Text style={styles.faqQuestion}>
                    How does AI prediction work?
                </Text>

                <Text style={styles.faqAnswer}>
                    The AI analyzes uploaded dental scans and predicts possible endodontic conditions.
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

    helpIconContainer: {
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

    sectionTitle: {
        fontSize: 18,
        fontWeight: "700",
        color: "#0F172A",
        marginBottom: 16,
    },

    card: {
        backgroundColor: "#FFFFFF",
        borderRadius: 22,
        paddingVertical: 18,
        paddingHorizontal: 18,
        marginBottom: 16,

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.04,
        shadowRadius: 6,

        elevation: 2,
    },

    cardLeft: {
        flexDirection: "row",
        alignItems: "center",
    },

    blueIcon: {
        width: 42,
        height: 42,
        borderRadius: 21,
        backgroundColor: "#2563EB",
        justifyContent: "center",
        alignItems: "center",
        marginRight: 14,
    },

    greenIcon: {
        width: 42,
        height: 42,
        borderRadius: 21,
        backgroundColor: "#10B981",
        justifyContent: "center",
        alignItems: "center",
        marginRight: 14,
    },

    cardTitle: {
        fontSize: 15,
        fontWeight: "700",
        color: "#0F172A",
    },

    cardSubtitle: {
        fontSize: 13,
        color: "#64748B",
        marginTop: 4,
    },

    faqCard: {
        backgroundColor: "#FFFFFF",
        borderRadius: 22,
        padding: 20,
        marginBottom: 16,

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.04,
        shadowRadius: 6,

        elevation: 2,
    },

    faqQuestion: {
        fontSize: 15,
        fontWeight: "700",
        color: "#0F172A",
        marginBottom: 10,
    },

    faqAnswer: {
        fontSize: 13,
        color: "#64748B",
        lineHeight: 20,
    },

});