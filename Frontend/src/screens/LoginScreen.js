import React, { useState } from "react";

import {
    loginUser
} from "../services/api";

import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

export default function LoginScreen({ navigation }) {

    const [showPassword, setShowPassword] = useState(false);

    const [error, setError] =
        useState("");

    const [email, setEmail] =
        useState("");

    const [password, setPassword] =
        useState("");

    const handleLogin = async () => {

        try {

            const result =
                await loginUser(
                    email,
                    password
                );

            if (result.success) {

                setError("");

                navigation.replace(
                    "Home",
                    {
                        user: result.user
                    }
                );

            } else {

                setError(result.message);

            }

        } catch (error) {

            console.log(error);

            alert(
                "Server Error"
            );

        }

    };

    return (
        <ScrollView
            style={styles.container}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContainer}
        >

            <View style={styles.logoContainer}>
                <Text style={styles.logo}>🦷</Text>
            </View>

            <Text style={styles.title}>Welcome Back</Text>

            <Text style={styles.subtitle}>
                Login to continue
            </Text>

            {/* EMAIL */}

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

            {/* PASSWORD */}

            <View style={styles.inputContainer}>
                <Ionicons
                    name="lock-closed-outline"
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
                />

                {/* ERROR MESSAGE */}

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
                    onPress={() => setShowPassword(!showPassword)}
                >
                    <Ionicons
                        name={showPassword ? "eye-outline" : "eye-off-outline"}
                        size={20}
                        color="#64748B"
                    />
                </TouchableOpacity>
            </View>

            {/* LOGIN BUTTON */}

            <TouchableOpacity
                activeOpacity={0.8}
                onPress={handleLogin}
            >
                <LinearGradient
                    colors={["#3B82F6", "#2563EB", "#1D4ED8"]}
                    style={styles.button}
                >
                    <Text style={styles.buttonText}>Login</Text>
                </LinearGradient>
            </TouchableOpacity>

            {/* SIGNUP */}

            <TouchableOpacity
                onPress={() => navigation.navigate("Signup")}
            >
                <Text style={styles.signupText}>
                    Don’t have an account? Sign Up
                </Text>
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

    logoContainer: {
        borderWidth: 2,
        borderColor: "rgba(255,255,255,0.2)",
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

    logo: {
        fontSize: 52,
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

    forgotButton: {
        alignSelf: "flex-end",
        marginTop: -6,
        marginBottom: 20,
    },

    forgotText: {
        color: "#2563EB",
        fontSize: 14,
        fontWeight: "600",
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

    signupText: {
        textAlign: "center",
        color: "#64748B",
        marginTop: 28,
        fontSize: 14,
    },

    errorText: {

        color: "#EF4444",

        fontSize: 13,

        marginTop: -10,

        marginBottom: 15,

        marginLeft: 5,

        fontWeight: "600",
    },

});