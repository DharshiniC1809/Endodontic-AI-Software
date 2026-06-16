import {
    signupUser
} from "../services/api";

import React, { useState } from "react";

import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    Modal,
    KeyboardAvoidingView,
    Platform,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

export default function SignupScreen({ navigation }) {

    const [showPassword, setShowPassword] = useState(false);

    const [name, setName] =
        useState("");

    const [email, setEmail] =
        useState("");

    const [password, setPassword] =
        useState("");

    const [error, setError] =
        useState("");

    const [showSuccess, setShowSuccess] = useState(false);

    const handleSignup = async () => {

        try {

            const result =
                await signupUser(
                    name,
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

            console.log(error);

            setError(
                "Server Error"
            );

        }

    };

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={
                Platform.OS === "ios"
                    ? "padding"
                    : "height"
            }
        >

            <ScrollView
                style={styles.container}
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContainer}
            >
                {/* LOGO */}
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
                        <Text style={styles.logo}>🦷</Text>
                    </View>

                    {/* TITLE */}

                    <Text style={styles.title}>Create Account</Text>

                    <Text style={styles.subtitle}>
                        Sign up to continue
                    </Text>

                    {/* FULL NAME */}

                    <View style={styles.inputContainer}>
                        <Ionicons
                            name="person-outline"
                            size={20}
                            color="#64748B"
                            style={styles.icon}
                        />

                        <TextInput
                            placeholder="Full Name"
                            placeholderTextColor="#94A3B8"
                            style={styles.input}
                            value={name}
                            onChangeText={setName}
                            textAlignVertical="center"
                        />
                    </View>

                    {/* EMAIL */}

                    <View style={styles.inputContainer}>
                        <Ionicons
                            name="mail"
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
                            textAlignVertical="center"
                        />
                    </View>

                    {/* PASSWORD */}

                    <View style={styles.inputContainer}>
                        <Ionicons
                            name="lock-closed"
                            size={20}
                            color="#64748B"
                            style={styles.icon}
                        />

                        <TextInput
                            placeholder="Password"
                            placeholderTextColor="#94A3B8"
                            secureTextEntry={!showPassword}
                            style={styles.input}
                            value={password}
                            onChangeText={setPassword}
                            textAlignVertical="center"
                        />

                        <TouchableOpacity
                            onPress={() => setShowPassword(!showPassword)}
                        >
                            <Ionicons
                                name={showPassword ? "eye" : "eye-off"}
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

                    {/* BUTTON */}

                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={handleSignup}
                    >
                        <LinearGradient
                            colors={["#14B8A6", "#0F766E"]}
                            style={styles.button}
                        >
                            <Text style={styles.buttonText}>
                                Sign Up
                            </Text>
                        </LinearGradient>
                    </TouchableOpacity>

                    {/* LOGIN */}

                    <TouchableOpacity
                        onPress={() => navigation.navigate("Login")}
                    >
                        <Text style={styles.loginText}>
                            Already have an account? Login
                        </Text>
                    </TouchableOpacity>

                    {/* SUCCESS MODAL */}

                    <Modal
                        transparent={true}
                        visible={showSuccess}
                        animationType="fade"
                    >

                        <View style={styles.modalOverlay}>

                            <View style={styles.modalContainer}>

                                {/* ICON */}

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

                                {/* TITLE */}

                                <Text style={styles.modalTitle}>
                                    Account Created
                                </Text>

                                <Text style={styles.modalSubtitle}>
                                    Your account has been created successfully
                                </Text>

                                {/* BUTTON */}

                                <TouchableOpacity
                                    activeOpacity={0.8}
                                    onPress={() => {

                                        setShowSuccess(false);

                                        navigation.navigate("Login");

                                    }}
                                >

                                    <LinearGradient
                                        colors={["#14B8A6", "#0F766E"]}
                                        style={styles.modalButton}
                                    >

                                        <Text style={styles.modalButtonText}>
                                            Continue
                                        </Text>

                                    </LinearGradient>

                                </TouchableOpacity>

                            </View>

                        </View>

                    </Modal>
                </View>
            </ScrollView>

        </KeyboardAvoidingView>
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
        paddingBottom: 30,
    },

    logoContainer: {
        alignSelf: "center",
        width: 95,
        height: 95,
        borderRadius: 50,
        backgroundColor: "#14B8A6",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 35,

        shadowColor: "#14B8A6",
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: 0.3,
        shadowRadius: 10,

        elevation: 8,
    },

    logo: {
        fontSize: 52,
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
        borderRadius: 16,
        alignItems: "center",
        marginTop: 10,
    },

    buttonText: {
        color: "#FFFFFF",
        fontSize: 16,
        fontWeight: "700",
    },

    loginText: {
        textAlign: "center",
        color: "#64748B",
        marginTop: 28,
        fontSize: 14,
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

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 8,
        },
        shadowOpacity: 0.08,
        shadowRadius: 10,

        elevation: 10,

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

        shadowColor: "#22C55E",
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: 0.25,
        shadowRadius: 8,

        elevation: 6,
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
        lineHeight: 22,
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

    errorText: {

        color: "#EF4444",

        fontSize: 13,

        marginBottom: 15,

        marginLeft: 5,

        fontWeight: "600",
    },

});