import React, { useState } from "react";

import {
    sendOTP
} from "../services/api";

import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    KeyboardAvoidingView,
    Platform,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

import { KeyboardAwareScrollView }
    from "react-native-keyboard-aware-scroll-view";

export default function ForgotPasswordScreen({
    navigation
}) {

    const [email, setEmail] =
        useState("");

    const [error, setError] =
        useState("");

    const [loading, setLoading] =
        useState(false);

    return (

        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={
                Platform.OS === "ios"
                    ? "padding"
                    : undefined
            }
        >

            <KeyboardAwareScrollView
                style={styles.container}
                contentContainerStyle={
                    styles.scrollContainer
                }
                enableOnAndroid={true}
                extraScrollHeight={20}
                keyboardShouldPersistTaps="handled"
            >

                <View
                    style={
                        Platform.OS === "web"
                            ? {
                                width: 500,
                                maxWidth: "90%",
                                alignSelf: "center",
                            }
                            : {}
                    }
                >

                    <TouchableOpacity
                        style={styles.backRow}
                        onPress={() => navigation.goBack()}
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

                    <View style={styles.logoContainer}>
                        <Text style={styles.logo}>
                            🔑
                        </Text>
                    </View>

                    <Text style={styles.title}>
                        Forgot Password
                    </Text>

                    <Text style={styles.subtitle}>
                        Enter your registered email
                    </Text>

                    <View style={styles.inputContainer}>

                        <Ionicons
                            name="mail-outline"
                            size={20}
                            color="#64748B"
                            style={styles.icon}
                        />

                        <TextInput
                            placeholder="Email"
                            placeholderTextColor="#94A3B8"
                            style={styles.input}
                            value={email}
                            onChangeText={setEmail}
                        />

                    </View>

                    {
                        error ? (

                            <Text
                                style={styles.errorText}
                            >
                                {error}
                            </Text>

                        ) : null
                    }

                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={async () => {

                            if (!email.trim()) {

                                setError(
                                    "Please enter your email"
                                );

                                return;
                            }

                            try {

                                setLoading(true);

                                const result =
                                    await sendOTP(email);

                                if (result.success) {

                                    setError("");

                                    navigation.navigate(
                                        "VerifyOTP",
                                        { email }
                                    );

                                } else {

                                    setError(
                                        result.message
                                    );

                                }

                            } catch (error) {

                                setError(
                                    "Server Error"
                                );

                            } finally {

                                setLoading(false);

                            }

                        }}
                    >

                        <LinearGradient
                            colors={[
                                "#3B82F6",
                                "#2563EB",
                                "#1D4ED8"
                            ]}
                            style={styles.button}
                        >

                            <Text
                                style={styles.buttonText}
                            >
                                {
                                    loading
                                        ? "Sending..."
                                        : "Send OTP"
                                }
                            </Text>

                        </LinearGradient>

                    </TouchableOpacity>

                </View>

            </KeyboardAwareScrollView>

        </KeyboardAvoidingView>

    );
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: "#F8FAFC",
        paddingHorizontal: 22,
    },

    scrollContainer: {
        flexGrow: 1,
        justifyContent: "center",
        paddingTop: 65,
        paddingBottom: 30,
    },

    logoContainer: {
        alignSelf: "center",
        width: 95,
        height: 95,
        borderRadius: 50,
        backgroundColor: "#2563EB",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 35,
        elevation: 8,
    },

    logo: {
        fontSize: 45,
    },

    title: {
        fontSize: 30,
        fontWeight: "700",
        color: "#0F172A",
        textAlign: "center",
    },

    subtitle: {
        fontSize: 15,
        color: "#64748B",
        textAlign: "center",
        marginTop: 8,
        marginBottom: 40,
    },

    inputContainer: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#FFFFFF",
        borderRadius: 16,
        borderWidth: 1,
        borderColor: "#E2E8F0",
        paddingHorizontal: 16,
        marginBottom: 20,
        height: 60,
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
        borderRadius: 16,
        alignItems: "center",
        marginTop: 10,
    },

    buttonText: {
        color: "#FFFFFF",
        fontSize: 16,
        fontWeight: "700",
    },

    backRow: {
        flexDirection: "row",
        alignItems: "center",
        alignSelf: "flex-start",
        marginBottom: 20,
    },

    backText: {
        color: "#2563EB",
        marginLeft: 8,
        fontSize: 16,
        fontWeight: "600",
    },

    errorText: {
        color: "#EF4444",
        fontSize: 13,
        marginBottom: 15,
        marginLeft: 5,
        fontWeight: "600",
    },

});