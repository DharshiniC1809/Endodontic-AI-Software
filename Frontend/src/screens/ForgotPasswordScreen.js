import React from "react";

import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
} from "react-native";

import {
    Ionicons,
} from "@expo/vector-icons";

import {
    LinearGradient,
} from "expo-linear-gradient";

export default function ForgotPasswordScreen({
    navigation,
}) {

    return (

        <ScrollView
            style={styles.container}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={
                styles.scrollContainer
            }
        >

            {/* BACK BUTTON */}

            <TouchableOpacity
                style={styles.backButton}
                onPress={() =>
                    navigation.goBack()
                }
            >

                <Ionicons
                    name="arrow-back"
                    size={22}
                    color="#2563EB"
                />

            </TouchableOpacity>

            {/* ICON */}

            <View style={styles.iconContainer}>

                <Ionicons
                    name="lock-closed"
                    size={48}
                    color="#FFFFFF"
                />

            </View>

            {/* TITLE */}

            <Text style={styles.title}>
                Forgot Password?
            </Text>

            <Text style={styles.subtitle}>
                Enter your registered email
                to receive an OTP verification
                code
            </Text>

            {/* EMAIL INPUT */}

            <View style={styles.inputContainer}>

                <Ionicons
                    name="mail-outline"
                    size={20}
                    color="#64748B"
                    style={styles.icon}
                />

                <TextInput
                    placeholder="Enter Email"
                    placeholderTextColor="#94A3B8"
                    style={styles.input}
                />

            </View>

            {/* BUTTON */}

            <TouchableOpacity
                activeOpacity={0.8}
                onPress={() =>
                    navigation.navigate(
                        "OtpVerification"
                    )
                }
            >

                <LinearGradient
                    colors={[
                        "#3B82F6",
                        "#2563EB",
                        "#1D4ED8"
                    ]}
                    style={styles.button}
                >

                    <Text style={styles.buttonText}>
                        Send OTP
                    </Text>

                </LinearGradient>

            </TouchableOpacity>

        </ScrollView>

    );
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: "#F8FAFC",
        paddingHorizontal: 28,
    },

    scrollContainer: {
        flexGrow: 1,
        justifyContent: "center",
    },

    backButton: {
        position: "absolute",
        top: 70,
        left: 0,

        width: 44,
        height: 44,

        borderRadius: 22,

        backgroundColor: "#FFFFFF",

        justifyContent: "center",
        alignItems: "center",

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.05,
        shadowRadius: 5,

        elevation: 3,
    },

    iconContainer: {
        alignSelf: "center",

        width: 110,
        height: 110,

        borderRadius: 55,

        backgroundColor: "#2563EB",

        justifyContent: "center",
        alignItems: "center",

        marginBottom: 38,

        shadowColor: "#2563EB",
        shadowOffset: {
            width: 0,
            height: 8,
        },
        shadowOpacity: 0.3,
        shadowRadius: 10,

        elevation: 8,
    },

    title: {
        fontSize: 32,
        fontWeight: "700",
        color: "#0F172A",
        textAlign: "center",
    },

    subtitle: {
        fontSize: 15,
        color: "#64748B",
        textAlign: "center",
        lineHeight: 24,
        marginTop: 10,
        marginBottom: 40,
    },

    inputContainer: {
        flexDirection: "row",
        alignItems: "center",

        backgroundColor: "#FFFFFF",

        borderRadius: 18,

        borderWidth: 1,
        borderColor: "#E2E8F0",

        paddingHorizontal: 16,

        height: 62,

        marginBottom: 28,

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.03,
        shadowRadius: 5,

        elevation: 2,
    },

    icon: {
        marginRight: 10,
    },

    input: {
        flex: 1,
        fontSize: 15,
        color: "#0F172A",
    },

    button: {
        paddingVertical: 18,
        borderRadius: 18,
        alignItems: "center",

        shadowColor: "#14B8A6",
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: 0.25,
        shadowRadius: 8,

        elevation: 6,
    },

    buttonText: {
        color: "#FFFFFF",
        fontSize: 16,
        fontWeight: "700",
    },

});