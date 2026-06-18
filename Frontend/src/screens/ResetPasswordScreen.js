import React, { useState } from "react";

import {
    resetPassword
} from "../services/api";

import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    KeyboardAvoidingView,
    Platform,
    Modal,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

import { KeyboardAwareScrollView }
    from "react-native-keyboard-aware-scroll-view";

export default function ResetPasswordScreen({
    navigation,
    route,
}) {

    const email =
        route?.params?.email;

    const [showPassword, setShowPassword] =
        useState(false);

    const [showConfirmPassword, setShowConfirmPassword] =
        useState(false);

    const [password, setPassword] =
        useState("");

    const [confirmPassword, setConfirmPassword] =
        useState("");

    const [error, setError] =
        useState("");

    const [showSuccess, setShowSuccess] =
        useState(false);

    const [loading, setLoading] =
        useState(false);

    const handleResetPassword =
        async () => {

            if (!password || !confirmPassword) {

                setError(
                    "Please fill all fields"
                );

                return;
            }

            if (password !== confirmPassword) {

                setError(
                    "Passwords do not match"
                );

                return;
            }

            try {

                setLoading(true);

                const result =
                    await resetPassword(
                        email,
                        password
                    );

                if (result.success) {

                    setError("");

                    setShowSuccess(true);

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

        };

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

                    <View style={styles.logoContainer}>

                        <Ionicons
                            name="lock-closed"
                            size={42}
                            color="#FFFFFF"
                        />

                    </View>

                    <Text style={styles.title}>
                        Reset Password
                    </Text>

                    <Text style={styles.subtitle}>
                        Create a new password
                    </Text>

                    {/* PASSWORD */}

                    <View style={styles.inputContainer}>

                        <Ionicons
                            name="lock-closed-outline"
                            size={20}
                            color="#64748B"
                            style={styles.icon}
                        />

                        <TextInput
                            placeholder="New Password"
                            placeholderTextColor="#94A3B8"
                            secureTextEntry={!showPassword}
                            style={styles.input}
                            value={password}
                            onChangeText={setPassword}
                        />

                        <TouchableOpacity
                            onPress={() =>
                                setShowPassword(
                                    !showPassword
                                )
                            }
                        >

                            <Ionicons
                                name={
                                    showPassword
                                        ? "eye-outline"
                                        : "eye-off-outline"
                                }
                                size={20}
                                color="#64748B"
                            />

                        </TouchableOpacity>

                    </View>

                    {/* CONFIRM PASSWORD */}

                    <View style={styles.inputContainer}>

                        <Ionicons
                            name="lock-closed-outline"
                            size={20}
                            color="#64748B"
                            style={styles.icon}
                        />

                        <TextInput
                            placeholder="Confirm Password"
                            placeholderTextColor="#94A3B8"
                            secureTextEntry={
                                !showConfirmPassword
                            }
                            style={styles.input}
                            value={confirmPassword}
                            onChangeText={
                                setConfirmPassword
                            }
                        />

                        <TouchableOpacity
                            onPress={() =>
                                setShowConfirmPassword(
                                    !showConfirmPassword
                                )
                            }
                        >

                            <Ionicons
                                name={
                                    showConfirmPassword
                                        ? "eye-outline"
                                        : "eye-off-outline"
                                }
                                size={20}
                                color="#64748B"
                            />

                        </TouchableOpacity>

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
                        onPress={
                            handleResetPassword
                        }
                    >

                        <LinearGradient
                            colors={[
                                "#3B82F6",
                                "#2563EB",
                                "#1D4ED8",
                            ]}
                            style={styles.button}
                        >

                            <Text
                                style={
                                    styles.buttonText
                                }
                            >
                                {
                                    loading
                                        ? "Updating..."
                                        : "Reset Password"
                                }
                            </Text>

                        </LinearGradient>

                    </TouchableOpacity>

                    <Modal
                        transparent={true}
                        visible={showSuccess}
                        animationType="fade"
                    >

                        <View style={styles.modalOverlay}>

                            <View style={styles.modalContainer}>

                                <LinearGradient
                                    colors={["#22C55E", "#16A34A"]}
                                    style={styles.successCircle}
                                >

                                    <Ionicons
                                        name="checkmark"
                                        size={34}
                                        color="#FFFFFF"
                                    />

                                </LinearGradient>

                                <Text style={styles.modalTitle}>
                                    Password Reset
                                </Text>

                                <Text style={styles.modalSubtitle}>
                                    Your password has been updated successfully
                                </Text>

                                <TouchableOpacity
                                    activeOpacity={0.8}
                                    onPress={() => {

                                        setShowSuccess(false);

                                        navigation.replace(
                                            "Login"
                                        );

                                    }}
                                >

                                    <LinearGradient
                                        colors={[
                                            "#3B82F6",
                                            "#2563EB"
                                        ]}
                                        style={styles.modalButton}
                                    >

                                        <Text style={styles.modalButtonText}>
                                            Go To Login
                                        </Text>

                                    </LinearGradient>

                                </TouchableOpacity>

                            </View>

                        </View>

                    </Modal>

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

        shadowColor: "#2563EB",
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: 0.3,
        shadowRadius: 10,

        elevation: 8,
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

    errorText: {
        color: "#EF4444",
        fontSize: 13,
        marginBottom: 15,
        marginLeft: 5,
        fontWeight: "600",
    },

    modalOverlay: {
        flex: 1,
        backgroundColor: "rgba(15,23,42,0.45)",
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 28,
    },

    modalContainer: {
        width: "100%",
        backgroundColor: "#FFFFFF",
        borderRadius: 30,
        paddingVertical: 38,
        paddingHorizontal: 24,
        alignItems: "center",

        ...(Platform.OS === "web" && {
            width: 470,
            alignSelf: "center",
        }),
    },

    successCircle: {
        width: 88,
        height: 88,
        borderRadius: 44,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 24,
    },

    modalTitle: {
        fontSize: 26,
        fontWeight: "700",
        color: "#0F172A",
    },

    modalSubtitle: {
        fontSize: 14,
        color: "#64748B",
        textAlign: "center",
        marginTop: 10,
        marginBottom: 30,
    },

    modalButton: {
        paddingHorizontal: 40,
        paddingVertical: 16,
        borderRadius: 18,
    },

    modalButtonText: {
        color: "#FFFFFF",
        fontSize: 15,
        fontWeight: "700",
    },

});